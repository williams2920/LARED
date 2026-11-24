import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
      <rect width="40" height="40" rx="11" fill="var(--color-primary)" />
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
      <circle cx="20" cy="20" r="2.2" fill="var(--color-primary)" />
    </svg>
    @if (showWordmark()) {
      <span class="wordmark">LA<span class="text-accent">RED</span></span>
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
  readonly size = input(36);
  readonly showWordmark = input(true);
}
