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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
