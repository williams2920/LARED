import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio | LA RED',
    loadComponent: () => import('@features/home/home').then((m) => m.Home),
  },
  {
    path: 'secciones/:section',
    title: 'Sección | LA RED',
    loadComponent: () => import('@features/section/section').then((m) => m.Section),
  },
  {
    path: 'secciones/:section/:sub',
    title: 'Subsección | LA RED',
    loadComponent: () => import('@features/section/section').then((m) => m.Section),
  },
  {
    path: '**',
    title: 'Página no encontrada | LA RED',
    loadComponent: () => import('@features/not-found/not-found').then((m) => m.NotFound),
  },
];
