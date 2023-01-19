import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertaInterface } from '../../interfaces/alerta-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reca-list',
  templateUrl: './reca-list.component.html',
  styleUrls: ['./reca-list.component.scss'],
})
export class RecaListComponent implements OnInit {
  data: AlertaInterface[] = [];
  page = 1;
  pageSize = 30;
  collectionSize = 0;
  dataPagination: AlertaInterface[];
  fecha_desde: Date;
  fecha_hasta: Date;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAlertas();
  }

  getAlertas() {
    const fechaDesde = new DatePipe('en-US').transform(
      '01/01/2000',
      'dd/MM/yyyy'
    );
    const fechaHasta = new DatePipe('en-US').transform(
      this.fecha_hasta,
      'dd/MM/yyyy'
    );

    var filtro_fecha = `?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`;

    this.http
      .get('http://172.16.60.98:7007/api-integrador/alertas' + filtro_fecha)
      .subscribe((respuesta: any) => {
        this.data = respuesta.data;
        this.collectionSize = this.data.length;
        this.refreshPagination();
      });
  }

  refreshPagination() {
    this.dataPagination = this.data
      .map((elemento, i) => ({ id: i + 1, ...elemento }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  Registrar() {
    this.router.navigate(['/reca-list/reca-register']);
  }
}
