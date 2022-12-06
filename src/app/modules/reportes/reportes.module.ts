import { ReportesRoutingModule } from './reportes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './pages/alerta/alerta.component';

@NgModule({
  declarations: [AlertaComponent],
  imports: [CommonModule, ReportesRoutingModule],
})
export class ReportesModule {}
