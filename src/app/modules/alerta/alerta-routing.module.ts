import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertaAccionMedidaComponent } from './pages/alerta-accion-medida/alerta-accion-medida.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AlertaAccionMedidaComponent,
        data: { title: 'Alertas' },
      },
      {
        path: 'acciones',
        component: AlertaAccionMedidaComponent,
        data: { title: 'Alertas, registro de accion y medida' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertaRoutingModule {}
