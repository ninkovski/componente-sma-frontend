import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { InicioComponent } from './inicio/inicio.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
