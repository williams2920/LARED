import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { findMenuItem } from '@core/navigation/menu';
import { Breadcrumb, PageHeader } from '@shared/components/page-header/page-header';

/** Página genérica para `/secciones/:section` y `/secciones/:section/:sub`. */
@Component({
  selector: 'app-section',
  imports: [RouterLink, PageHeader],
  templateUrl: './section.html',
  styleUrl: './section.scss',
})
export class Section {
  /** Parámetros de ruta enlazados con `withComponentInputBinding()`. */
  readonly section = input.required<string>();
  readonly sub = input<string>();

  protected readonly parent = computed(() => findMenuItem(`/secciones/${this.section()}`));
  protected readonly current = computed(() => {
    const sub = this.sub();
    return sub ? findMenuItem(`/secciones/${this.section()}/${sub}`) : this.parent();
  });

  protected readonly breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs: Breadcrumb[] = [{ label: 'Inicio', path: '/' }];
    const parent = this.parent();
    if (parent) crumbs.push({ label: parent.label, path: parent.path });
    const current = this.current();
    if (current && current !== parent) crumbs.push({ label: current.label });
    return crumbs;
  });
}
