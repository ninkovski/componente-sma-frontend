import { ReportesRoutingModule } from './reportes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from './pages/alerta/alerta.component';
import { TentativaComponent } from './pages/tentativa/tentativa.component';
import { RiesgoComponent } from './pages/riesgo/riesgo.component';

@NgModule({
  declarations: [AlertaComponent, TentativaComponent, RiesgoComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
  ],
})
export class ReportesModule {}
