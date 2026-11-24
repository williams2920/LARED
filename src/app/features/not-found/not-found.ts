import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="container page">
      <p class="code">404</p>
      <h1>Página no encontrada</h1>
      <p>La página que buscas no existe o fue movida.</p>
      <a class="btn btn--primary" routerLink="/">Volver al inicio</a>
    </div>
  `,
  styles: `
    .page {
      padding-block: var(--space-8);
      text-align: center;
      display: grid;
      justify-items: center;
      gap: var(--space-4);
    }
    .code {
      font-family: var(--font-display);
      font-size: 6rem;
      font-weight: 800;
      line-height: 1;
      color: var(--color-primary);
    }
  `,
})
export class NotFound {}
