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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
