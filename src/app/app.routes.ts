import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@core/guards/auth.guards';

const comingSoon = () => import('@features/coming-soon/coming-soon').then((m) => m.ComingSoon);

export const routes: Routes = [
  {
    path: 'login',
    title: 'Entrar · LA RED',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('@core/layout/shell/shell').then((m) => m.Shell),
    children: [
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
        path: 'comunidades',
        title: 'Comunidades · LA RED',
        loadComponent: () => import('@features/communities/communities').then((m) => m.Communities),
      },
      {
        path: 'agentes',
        title: 'Agentes · LA RED',
        loadComponent: () => import('@features/agents/agents').then((m) => m.Agents),
      },
      {
        path: 'integraciones',
        title: 'Integraciones · LA RED',
        loadComponent: () =>
          import('@features/integrations/integrations').then((m) => m.Integrations),
      },
      {
        path: 'perfil',
        title: 'Perfil · LA RED',
        loadComponent: () => import('@features/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'ajustes',
        title: 'Ajustes · LA RED',
        loadComponent: () => import('@features/settings/settings').then((m) => m.Settings),
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
        path: '**',
        title: 'Página no encontrada · LA RED',
        loadComponent: () => import('@features/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
];
