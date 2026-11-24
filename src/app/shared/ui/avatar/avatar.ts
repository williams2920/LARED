import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icons';

/** Avatar con iniciales y degradado; para agentes muestra un icono y forma de "chip". */
@Component({
  selector: 'app-avatar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (icon(); as icon) {
      <app-icon [name]="icon" [size]="size() * 0.5" [strokeWidth]="2" />
    } @else {
      {{ initials() }}
    }
    @if (online()) {
      <span class="presence" aria-label="En línea"></span>
    }
  `,
  host: {
    '[class.agent]': 'agent()',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[style.font-size.px]': 'size() * 0.38',
    '[style.background]': 'background()',
  },
  styles: `
    :host {
      position: relative;
      display: inline-grid;
      place-items: center;
      flex-shrink: 0;
      border-radius: 50%;
      color: #fff;
      font-family: var(--font-display);
      font-weight: 700;
      user-select: none;
    }
    :host(.agent) {
      border-radius: 30%;
      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.2);
    }
    .presence {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 28%;
      height: 28%;
      border-radius: 50%;
      background: var(--color-success);
      box-shadow: 0 0 0 2px var(--color-surface);
    }
  `,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input(40);
  readonly hue = input<number>();
  readonly icon = input<IconName>();
  readonly agent = input(false);
  readonly online = input(false);

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join(''),
  );

  protected readonly background = computed(() => {
    const h = this.hue() ?? [...this.name()].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
    return `linear-gradient(135deg, hsl(${h} 80% 62%), hsl(${(h + 50) % 360} 85% 52%))`;
  });
}
