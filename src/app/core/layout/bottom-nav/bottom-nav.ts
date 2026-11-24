import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MOBILE_NAV } from '@core/navigation/navigation';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Navegación principal">
      <ul role="list">
        @for (item of items; track item.path; let i = $index) {
          @if (i === 2) {
            <li>
              <a class="create" routerLink="/" fragment="crear" aria-label="Crear publicación">
                <app-icon name="plus" [size]="24" [strokeWidth]="2.25" />
              </a>
            </li>
          }
          <li>
            <a
              class="item"
              [routerLink]="item.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              #rla="routerLinkActive"
            >
              <span class="item__icon">
                <app-icon
                  [name]="item.icon"
                  [size]="22"
                  [strokeWidth]="rla.isActive ? 2.25 : 1.75"
                />
                @if (item.badge) {
                  <span class="item__badge">{{ item.badge }}</span>
                }
              </span>
              <span class="item__label">{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {
  protected readonly items = MOBILE_NAV;
}
