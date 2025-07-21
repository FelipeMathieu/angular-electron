import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'selected-item/:id',
    loadComponent: () =>
      import('./pages/selected-item/selected-item.component').then(
        (c) => c.SelectedItemComponent
      ),
  },
];
