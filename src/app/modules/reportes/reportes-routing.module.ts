import { TentativaComponent } from './pages/tentativa/tentativa.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';
import { AlertaComponent } from './pages/alerta/alerta.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AlertaComponent, data: { title: 'alertas' } },
      {
        path: 'alertas',
        component: AlertaComponent,
        data: { title: 'alertas' },
      },
      {
        path: 'mujeres-riesgo',
        component: RiesgoComponent,
        data: { title: 'Reporte de mujeres en riesgo' },
      },
      {
        path: 'feminicidio-tentativa',
        component: TentativaComponent,
        data: { title: 'Reporte de caracterización' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
