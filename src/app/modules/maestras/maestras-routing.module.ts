import { ParametrosComponent } from './pages/parametros/parametros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ParametrosComponent,
        data: { title: 'Parametros.' },
      },
      {
        path: 'parametros',
        component: ParametrosComponent,
        data: { title: 'Parametros.' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestrasRoutingModule {}
