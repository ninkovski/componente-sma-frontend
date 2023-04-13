import { RespuestaDenuncias } from './../../interfaces/respuesta-denuncias';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RespuestaAlertas } from '../../interfaces/respuesta-alertas';
import { SelectInterface } from '../../interfaces/select-interface';
import { dataModalInterfase } from '../../interfaces/modal-interface';
import { AlertaMedida } from '../../interfaces/alerta-medida';

@Component({
  selector: 'app-alerta-accion-medida',
  templateUrl: './alerta-accion-medida.component.html',
  styleUrls: ['./alerta-accion-medida.component.scss'],
})
export class AlertaAccionMedidaComponent implements OnInit {
  data: RespuestaAlertas[] = [];
  dataDenuncias: RespuestaDenuncias[] = [];
  dataAccion: SelectInterface[] = [];
  dataMedida: SelectInterface[] = [];
  alertaMedida: AlertaMedida[] = [];

  dataModal: dataModalInterfase = {
    display: 'none',
    esAccion: false,
    alertaId: 0,
    selectId: 0,
    selectList: [],
    detalle: '',
  };
  dataModalDenuncias: dataModalInterfase = {
    display: 'none',
    esAccion: false,
    alertaId: 0,
    selectId: 0,
    selectList: [],
    detalle: '',
  };
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  dataPagination: RespuestaAlertas[];
  fecha_desde: Date;
  fecha_hasta: Date;

  constructor(private http: HttpClient) {
    this.dataModal.display = 'none';
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8082/api-integrador/alertas/accion')
      .subscribe((respuesta: any) => {
        if (respuesta.data.length > 0) {
          respuesta.data.forEach((element) => {
            this.dataAccion.push({
              id: element.idAccionAlerta,
              descripcion: element.descripcion,
            });
          });
        }
      });

    this.http
      .get('http://localhost:8082/api-integrador/alertas/proteccion')
      .subscribe((respuesta: any) => {
        if (respuesta.data.length > 0) {
          respuesta.data.forEach((element) => {
            this.dataMedida.push({
              id: element.idProteccionAlerta,
              descripcion: element.descripcion,
            });
          });
        }
      });
    this.getAlertas();
  }

  getAlertas() {
    let fechaDesde = new DatePipe('en-US').transform(
      '01/01/2000',
      'dd/MM/yyyy'
    );

    const fechaHasta = new DatePipe('en-US').transform(
      this.fecha_hasta,
      'dd/MM/yyyy'
    );

    var filtro_fecha = `?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`;

    this.http
      .get('http://localhost:8082/api-integrador/alertas' + filtro_fecha)
      .subscribe(async (respuesta: any) => {
        this.data = respuesta.data;
        this.collectionSize = this.data.length;
        this.refreshPagination();
        console.log(this.data);
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

  openModal(tipo: string, alertaId: number) {
    this.dataModal.display = 'block';

    if (tipo == 'accion') {
      this.dataModal.esAccion = true;
      this.dataModal.selectList = this.dataAccion;
    } else {
      this.dataModal.esAccion = false;
      this.dataModal.selectList = this.dataMedida;
    }

    this.dataModal.selectId = 0;
    this.dataModal.alertaId = alertaId;
    this.dataModal.detalle = '';
  }

  cantidadAlertaProteccion(alertaId: number) {
    var cantidadAlertas: number;
    var cantidadMedidas: number;

    this.http
      .get(
        'http://localhost:8082/api-integrador/alertas/alerta-accion-proteccion/' +
          alertaId
      )
      .subscribe((respuesta: any) => {
        this.alertaMedida = respuesta.data;
      });
  }

  openModalDenuncias(tipo: string, alertaId: number) {
    this.dataModalDenuncias.display = 'block';
    this.dataModal.alertaId = alertaId;

    this.http
      .get(
        'http://localhost:8082/api-integrador/denuncias?idAlerta=' + alertaId
      )
      .subscribe((respuesta: any) => {
        this.dataDenuncias = respuesta.data;
      });
  }
  cerrarModalDenuncias() {
    this.dataModalDenuncias.display = 'none';
  }
  registerAccionMedida() {
    const now = new Date();
    var data = null;

    if (this.dataModal.selectId == 0) {
      alert('Seleccione el tipo.');
    } else {
      if (this.dataModal.esAccion == true) {
        data = {
          idAlerta: this.dataModal.alertaId,
          idAccion: this.dataModal.selectId,
          detalleAccion: this.dataModal.detalle,
          idMedidaProteccion: null,
          detalleMedidaProteccion: null,
          usuarioRegistro: 'demo',
          fechaRegistro: now.toLocaleDateString(),
        };
        
      this.http
        .post(
          'http://localhost:8082/api-integrador/alertas/alerta-accion',
          data
        )
        .subscribe((respuesta: any) => {
          alert('Se grabo con exito.');
          this.dataModal.display = 'none';
        });
      } else {
        data = {
          idAlerta: this.dataModal.alertaId,
          idAccion: null,
          detalleAccion: null,
          idMedidaProteccion: this.dataModal.selectId,
          detalleMedidaProteccion: this.dataModal.detalle,
          usuarioRegistro: 'demo',
          fechaRegistro: now.toLocaleDateString(),
        };
        
      this.http
        .post(
          'http://localhost:8082/api-integrador/alertas/alerta-proteccion',
          data
        )
        .subscribe((respuesta: any) => {
          alert('Se grabo con exito.');
          this.dataModal.display = 'none';
        });
      }

    }
  }
}
