import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/** Isotipo de LA RED: un núcleo central que conecta todos los nodos. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="mark"
      viewBox="0 0 40 40"
      [attr.width]="size()"
      [attr.height]="size()"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          [attr.id]="gradientId"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#7c5cff" />
          <stop offset="0.5" stop-color="#4f8bff" />
          <stop offset="1" stop-color="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" [attr.fill]="gradientUrl" />
      <g stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="0.55">
        <path d="M20 20 11 13M20 20l9-7M20 20l-9 8M20 20l9 8M20 20v-11M20 20v11" />
      </g>
      <g stroke="#fff" stroke-width="1.6" fill="none" opacity="0.9">
        <path d="M11 13 20 9l9 4M29 28l-9 3-9-3" />
      </g>
      <g fill="#fff">
        <circle cx="11" cy="13" r="2.2" />
        <circle cx="29" cy="13" r="2.2" />
        <circle cx="11" cy="28" r="2.2" />
        <circle cx="29" cy="28" r="2.2" />
        <circle cx="20" cy="9" r="2" />
        <circle cx="20" cy="31" r="2" />
      </g>
      <circle cx="20" cy="20" r="4.6" fill="#fff" />
      <circle cx="20" cy="20" r="2.2" [attr.fill]="gradientUrl" />
    </svg>
    @if (showWordmark()) {
      <span class="wordmark">LA<span class="text-gradient">RED</span></span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
    }
    .mark {
      flex-shrink: 0;
      filter: drop-shadow(0 4px 14px rgb(124 92 255 / 0.45));
    }
    .wordmark {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: var(--color-text);
    }
  `,
})
export class Logo {
  // Id único por instancia: si el gradiente vive en un logo oculto (display: none) el resto no se pinta.
  protected readonly gradientId = `lared-grad-${nextId++}`;
  protected readonly gradientUrl = `url(#${this.gradientId})`;

  readonly size = input(36);
  readonly showWordmark = input(true);
}
