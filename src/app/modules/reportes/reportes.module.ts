import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './pages/alerta/alerta.component';
/*import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';*/

@NgModule({
  declarations: [AlertaComponent],
  imports: [
    CommonModule,
    /* MatTableModule, MatPaginatorModule*/
  ],
})
export class ReportesModule {}
