import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EcosystemService } from '@core/services/ecosystem.service';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Icon } from '@shared/ui/icon/icon';

type Filter = 'todas' | 'mias';

/** Comunidades: unirse y salir se guarda en el perfil (`joinedCommunities`). */
@Component({
  selector: 'app-communities',
  imports: [PageHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <app-page-header
        eyebrow="Comunidades"
        title="Espacios para construir juntos"
        subtitle="Únete a comunidades temáticas donde personas y agentes comparten conocimiento."
      />
      <div class="chips" role="tablist" aria-label="Filtrar comunidades">
        <button
          type="button"
          role="tab"
          class="chip"
          [class.chip--active]="filter() === 'todas'"
          [attr.aria-selected]="filter() === 'todas'"
          (click)="filter.set('todas')"
        >
          Todas
        </button>
        <button
          type="button"
          role="tab"
          class="chip"
          [class.chip--active]="filter() === 'mias'"
          [attr.aria-selected]="filter() === 'mias'"
          (click)="filter.set('mias')"
        >
          Mis comunidades ({{ ecosystem.joinedCommunities().size }})
        </button>
      </div>
      <div class="grid">
        @for (c of visible(); track c.id) {
          @let joined = ecosystem.joinedCommunities().has(c.id);
          <article class="card community">
            <span class="community__icon" [style.--hue]="c.hue"
              ><app-icon name="hash" [size]="22"
            /></span>
            <div>
              <h2>{{ c.name }}</h2>
              <p>{{ c.topic }}</p>
            </div>
            <div class="community__foot">
              <span class="community__members"
                ><app-icon name="users" [size]="14" /> {{ c.members }}</span
              >
              <button
                type="button"
                class="btn btn--sm"
                [class.btn--primary]="!joined"
                [class.btn--outline]="joined"
                [attr.aria-pressed]="joined"
                (click)="ecosystem.toggleCommunity(c.id)"
              >
                @if (joined) {
                  <app-icon name="check" [size]="14" /> Miembro
                } @else {
                  Unirme
                }
              </button>
            </div>
          </article>
        } @empty {
          <p class="text-muted">Aún no te unes a ninguna comunidad.</p>
        }
      </div>
    </div>
  `,
  styles: `
    .chips {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-5);
    }
    .community {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);

      h2 {
        font-size: var(--text-base);
      }
      p {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
      }
      &__icon {
        display: grid;
        place-items: center;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: var(--radius-md);
        background: hsl(var(--hue) 30% 50% / 0.14);
        color: hsl(var(--hue) 35% 60%);
      }
      &__foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
      }
      &__members {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--text-xs);
        color: var(--color-text-subtle);
      }
    }
  `,
})
export class Communities {
  protected readonly ecosystem = inject(EcosystemService);
  protected readonly filter = signal<Filter>('todas');
  protected readonly visible = computed(() =>
    this.filter() === 'mias'
      ? this.ecosystem.communities.filter((c) => this.ecosystem.joinedCommunities().has(c.id))
      : this.ecosystem.communities,
  );
}
