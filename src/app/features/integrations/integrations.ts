import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Integration } from '@core/data/models';
import { EcosystemService } from '@core/services/ecosystem.service';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-integrations',
  imports: [PageHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './integrations.html',
  styleUrl: './integrations.scss',
})
export class Integrations {
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly categories = [
    'Todas',
    'Modelos IA',
    'Desarrollo',
    'Comunicación',
    'Diseño',
    'Productividad',
  ] as const;
  protected readonly category = signal<(typeof this.categories)[number]>('Todas');
  protected readonly query = signal('');

  protected readonly filtered = computed<Integration[]>(() => {
    const c = this.category();
    const q = this.query().trim().toLowerCase();
    return this.ecosystem.integrations.filter(
      (i) => (c === 'Todas' || i.category === c) && (!q || i.name.toLowerCase().includes(q)),
    );
  });
}
