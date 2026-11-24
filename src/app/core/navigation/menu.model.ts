export interface MenuItem {
  label: string;
  /** Ruta absoluta, p. ej. `/secciones/uno`. */
  path: string;
  description?: string;
  children?: MenuItem[];
}
