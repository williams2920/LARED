import { MenuItem } from './menu.model';

const ordinals = ['uno', 'dos', 'tres', 'cuatro'] as const;
const titles = ['Uno', 'Dos', 'Tres', 'Cuatro'] as const;

/**
 * Definición única del menú principal.
 * Edita este arreglo para agregar/quitar secciones; el navbar y las páginas lo leen de aquí.
 */
export const MAIN_MENU: MenuItem[] = [
  { label: 'Inicio', path: '/' },
  ...ordinals.map((slug, i) => ({
    label: `Sección ${titles[i]}`,
    path: `/secciones/${slug}`,
    description: `Contenido de la sección ${slug}.`,
    children: ordinals.map((subSlug) => ({
      label: `Subsección ${slug} ${subSlug}`,
      path: `/secciones/${slug}/${subSlug}`,
      description: `Contenido de la subsección ${slug} ${subSlug}.`,
    })),
  })),
];

export function findMenuItem(path: string, items: MenuItem[] = MAIN_MENU): MenuItem | undefined {
  for (const item of items) {
    if (item.path === path) return item;
    const child = item.children && findMenuItem(path, item.children);
    if (child) return child;
  }
  return undefined;
}
