import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './shared/layouts/full/full-layout.component';
import { Error404Component } from './shared/components/error/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tablero',
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
        path: 'tablero',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'administracion',
        loadChildren: () =>
          import('./modules/administracion/administracion.module').then(
            (m) => m.AdministracionModule
          ),
      },
      /*{path: 'InicioComponent',loadChildren:  () => import('./modules/dashboard/inicio.module').then(m => m.InicioModule)},
      {path: 'Alertas',loadChildren:          () => import('./modules/reportes/reportes.module').then(m => m.AlertasModule)},
      {path: 'Reportes',loadChildren:         () => import('./modules/alertas/alertas.module').then(m => m.ReportesModule)},
      {path: 'Dashboard',loadChildren:        () => import('./modules/dashboard/dashboard.module').then(m => m.DashboarModule)},*/
      /*{ path: 'Login', component: LoginComponent },
      { path: 'Menu', component: InicioComponent },
      { path: 'Menu/Alertas', component: AlertasComponent },
      { path: 'Menu/Reportes', component: ReportesComponent },
      { path: 'Menu/Dashboard', component: DashboardComponent },*/
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
