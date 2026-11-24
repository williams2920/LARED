import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Encabezado de página: eyebrow + título + descripción y acciones proyectadas. */
@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @if (eyebrow()) {
        <p class="eyebrow">{{ eyebrow() }}</p>
      }
      <h1>{{ title() }}</h1>
      @if (subtitle()) {
        <p class="subtitle">{{ subtitle() }}</p>
      }
    </div>
    <div class="actions"><ng-content /></div>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }
    .eyebrow {
      margin-bottom: var(--space-2);
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-primary);
    }
    .subtitle {
      max-width: 42rem;
      margin-top: var(--space-2);
      color: var(--color-text-muted);
    }
    .actions:empty {
      display: none;
    }
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly eyebrow = input<string>();
}
