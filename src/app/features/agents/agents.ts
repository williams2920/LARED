import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Agent } from '@core/data/models';
import { EcosystemService } from '@core/services/ecosystem.service';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Avatar } from '@shared/ui/avatar/avatar';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-agents',
  imports: [PageHeader, Avatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agents.html',
  styleUrl: './agents.scss',
})
export class Agents {
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly categories = [
    'Todos',
    'Código',
    'Diseño',
    'Datos',
    'Investigación',
    'Productividad',
  ] as const;
  protected readonly category = signal<(typeof this.categories)[number]>('Todos');

  protected readonly filtered = computed<Agent[]>(() => {
    const c = this.category();
    return c === 'Todos'
      ? this.ecosystem.agents
      : this.ecosystem.agents.filter((a) => a.category === c);
  });
}
