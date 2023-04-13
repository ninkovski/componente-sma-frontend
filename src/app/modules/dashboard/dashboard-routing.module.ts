import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardIIComponent } from './dashboardii/dashboardii.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: InicioComponent, data: { title: 'Inicio' } },
      { path: 'Inicio', component: InicioComponent, data: { title: 'Inicio' } },
      {
        path: 'principal',
        component: PrincipalComponent,
        data: { title: 'principal' },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'dashboardii',
        component: DashboardIIComponent,
        data: { title: 'Dashboard II' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
