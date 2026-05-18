import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('@features/news/news-detail/news-detail.component').then((m) => m.NewsDetailComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('@features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    // Slug-маршрут перехватывает всё именованное — должен быть последним
    path: ':slug',
    loadComponent: () => import('@features/page/page.component').then((m) => m.PageComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
