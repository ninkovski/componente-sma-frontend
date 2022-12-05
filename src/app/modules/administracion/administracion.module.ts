import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../shared/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { TipoEstablecimientoComponent } from './pages/tipo-establecimiento/tipo-establecimiento.component';
import { FormTipoEstablecimientoComponent } from './pages/tipo-establecimiento/form-tipo-establecimiento/form-tipo-establecimiento.component';
import { EstablecimientoComponent } from './pages/establecimiento/establecimiento.component';
import { FormEstablecimientoComponent } from './pages/establecimiento/form-establecimiento/form-establecimiento.component';
import { PlantaComponent } from './pages/planta/planta.component';
import { FormListPlantaComponent } from './pages/planta/form-list-planta/form-list-planta.component';
import { AmbienteComponent } from './pages/ambiente/ambiente.component';
import { FormListAmbienteComponent } from './pages/ambiente/form-list-ambiente/form-list-ambiente.component';
import { DependenciaUbicacionComponent } from './pages/dependencia-ubicacion/dependencia-ubicacion.component';
import { FormDependenciaUbicacionComponent } from './pages/dependencia-ubicacion/form-dependencia-ubicacion/form-dependencia-ubicacion.component';
import { AddDependenciaUbicacionComponent } from './pages/dependencia-ubicacion/add-dependencia-ubicacion/add-dependencia-ubicacion.component';

@NgModule({
  declarations: [
    FormEstablecimientoComponent,
    TipoEstablecimientoComponent,
    FormTipoEstablecimientoComponent,
    EstablecimientoComponent,
    PlantaComponent,
    FormListPlantaComponent,
    AmbienteComponent,
    FormListAmbienteComponent,
    DependenciaUbicacionComponent,
    FormDependenciaUbicacionComponent,
    AddDependenciaUbicacionComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ComponentsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministracionModule { }
