import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoEstablecimientoComponent } from './pages/tipo-establecimiento/tipo-establecimiento.component';
import { EstablecimientoComponent } from './pages/establecimiento/establecimiento.component';
import { DependenciaUbicacionComponent } from './pages/dependencia-ubicacion/dependencia-ubicacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tipos-establecimientos',component: TipoEstablecimientoComponent,data: {title: 'Tipos de establecimientos'}},
      { path: 'establecimientos',component: EstablecimientoComponent,data: {title: 'Establecimientos'}},
      { path: 'dependencias-ubicacion',component: DependenciaUbicacionComponent,data: {title: 'Ubicaciones de las dependencias'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
