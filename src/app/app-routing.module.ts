import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './shared/layouts/full/full-layout.component';
import { Error404Component } from './shared/components/error/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'Principal' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./modules/reportes/reportes.module').then(
            (m) => m.ReportesModule
          ),
      },
    ],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
