import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icons';

/** Marcador para secciones aún no construidas. Recibe sus datos desde `data` de la ruta. */
@Component({
  selector: 'app-coming-soon',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page empty">
      <span class="empty__icon"><app-icon [name]="icon()" [size]="32" /></span>
      <h1>{{ heading() }}</h1>
      <p>{{ description() }}</p>
      <span class="badge badge--accent">Próximamente</span>
      <a routerLink="/" class="btn btn--secondary">Volver al inicio</a>
    </div>
  `,
  styles: `
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding-block: var(--space-8);
      text-align: center;
    }
    .empty__icon {
      display: grid;
      place-items: center;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: var(--radius-xl);
      background: var(--gradient-brand);
      color: #fff;
      box-shadow: var(--shadow-glow);
    }
    p {
      max-width: 28rem;
      color: var(--color-text-muted);
    }
  `,
})
export class ComingSoon {
  readonly heading = input('Próximamente');
  readonly description = input('');
  readonly icon = input<IconName>('sparkles');
}
