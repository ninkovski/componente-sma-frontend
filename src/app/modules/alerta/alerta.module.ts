import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertaRoutingModule } from "./alerta-routing.module";
import { AlertaAccionMedidaComponent } from './pages/alerta-accion-medida/alerta-accion-medida.component';

@NgModule({
  declarations: [
    AlertaAccionMedidaComponent
  ],
  imports: [
    CommonModule,
    AlertaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class AlertaModule { }
