import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RespuestaAlertas } from '../../interfaces/respuesta-alertas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent {
  data: RespuestaAlertas[] = [];
  page = 1;
  pageSize = 30;
  collectionSize = 0;
  dataPagination: RespuestaAlertas[];
  fecha_desde: Date;
  fecha_hasta: Date;

  constructor(private http: HttpClient) {

  }

  getAlertas() {
    const fechaDesde = new DatePipe('en-US').transform(this.fecha_desde, 'dd/MM/yyyy');
    const fechaHasta = new DatePipe('en-US').transform(this.fecha_hasta, 'dd/MM/yyyy')

    var filtro_fecha = `?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`;

    this.http
      .get('http://localhost:8082/api-integrador/alertas' + filtro_fecha)
      .subscribe((respuesta: any) => {
        this.data = respuesta.data;
        this.collectionSize = this.data.length;
        this.refreshPagination();
      });
  }

  refreshPagination() {
    this.dataPagination = this.data.map((elemento, i) => ({ id: i + 1, ...elemento })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }
}