import { IconName } from '@shared/ui/icon/icons';

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  /** Contador opcional (notificaciones, mensajes sin leer…). */
  badge?: number;
  /** Aparece en la barra inferior en móvil. */
  mobile?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * Fuente única del menú. Sidebar, barra inferior y paleta de comandos la leen de aquí.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: 'Inicio', path: '/', icon: 'home', mobile: true },
      { label: 'Explorar', path: '/explorar', icon: 'compass', mobile: true },
      { label: 'Comunidades', path: '/comunidades', icon: 'users' },
      { label: 'Mensajes', path: '/mensajes', icon: 'message', badge: 3, mobile: true },
      { label: 'Notificaciones', path: '/notificaciones', icon: 'bell', badge: 12 },
    ],
  },
  {
    title: 'Ecosistema IA',
    items: [
      { label: 'Agentes', path: '/agentes', icon: 'bot', mobile: true },
      { label: 'Integraciones', path: '/integraciones', icon: 'plug' },
    ],
  },
  {
    title: 'Tú',
    items: [
      { label: 'Perfil', path: '/perfil', icon: 'user' },
      { label: 'Ajustes', path: '/ajustes', icon: 'settings' },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
export const MOBILE_NAV: NavItem[] = NAV_ITEMS.filter((i) => i.mobile);
