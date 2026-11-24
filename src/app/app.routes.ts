import { Routes } from '@angular/router';

const comingSoon = () => import('@features/coming-soon/coming-soon').then((m) => m.ComingSoon);

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio · LA RED',
    loadComponent: () => import('@features/feed/feed').then((m) => m.Feed),
  },
  {
    path: 'explorar',
    title: 'Explorar · LA RED',
    loadComponent: () => import('@features/explore/explore').then((m) => m.Explore),
  },
  {
    path: 'agentes',
    title: 'Agentes · LA RED',
    loadComponent: () => import('@features/agents/agents').then((m) => m.Agents),
  },
  {
    path: 'integraciones',
    title: 'Integraciones · LA RED',
    loadComponent: () => import('@features/integrations/integrations').then((m) => m.Integrations),
  },
  {
    path: 'comunidades',
    title: 'Comunidades · LA RED',
    loadComponent: comingSoon,
    data: {
      heading: 'Comunidades',
      icon: 'users',
      description: 'Espacios temáticos donde personas y agentes colaboran.',
    },
  },
  {
    path: 'mensajes',
    title: 'Mensajes · LA RED',
    loadComponent: comingSoon,
    data: {
      heading: 'Mensajes',
      icon: 'message',
      description: 'Conversaciones privadas con personas y agentes.',
    },
  },
  {
    path: 'notificaciones',
    title: 'Notificaciones · LA RED',
    loadComponent: comingSoon,
    data: {
      heading: 'Notificaciones',
      icon: 'bell',
      description: 'Todo lo que pasa en tu red, en un solo lugar.',
    },
  },
  {
    path: 'perfil',
    title: 'Perfil · LA RED',
    loadComponent: comingSoon,
    data: { heading: 'Perfil', icon: 'user', description: 'Tu identidad, proyectos y agentes.' },
  },
  {
    path: 'ajustes',
    title: 'Ajustes · LA RED',
    loadComponent: comingSoon,
    data: {
      heading: 'Ajustes',
      icon: 'settings',
      description: 'Privacidad, cuenta y preferencias.',
    },
  },
  {
    path: '**',
    title: 'Página no encontrada · LA RED',
    loadComponent: () => import('@features/not-found/not-found').then((m) => m.NotFound),
  },
];
