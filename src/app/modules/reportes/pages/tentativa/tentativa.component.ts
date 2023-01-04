import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RespuestaAlertas } from '../../interfaces/respuesta-alertas';
import { DownloadService } from 'src/app/shared/services/download.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { when } from 'jquery';
@Component({
  selector: 'app-tentativa',
  templateUrl: './tentativa.component.html',
  styleUrls: ['./tentativa.component.scss'],
})
export class TentativaComponent implements OnInit {
  data: RespuestaAlertas[] = [];

  displayedColumns: string[] = [
    'idAlerta',
    'juridiccion',
    'dependenciaMPub',
    'dependenciaPol',
    'caso',
    'fechaIngreso',
    'nombreAgraviado',
    'nombreImputado',
    'sexo',
  ];
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  dataPagination: RespuestaAlertas[];
  fecha_desde: Date;
  fecha_hasta: Date;

  constructor(private http: HttpClient, private download: DownloadService) {}

  ngOnInit(): void {
    this.getAlertas();
  }

  getAlertas() {
    const fechaDesde = new DatePipe('en-US').transform(
      this.fecha_desde,
      'dd/MM/yyyy'
    );
    const fechaHasta = new DatePipe('en-US').transform(
      this.fecha_hasta,
      'dd/MM/yyyy'
    );

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
    this.dataPagination = this.data
      .map((elemento, i) => ({ id: i + 1, ...elemento }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  exportExcel() {
    this.download.exportExcel(
      document.getElementById('myReporte'),
      'Alertas',
      'DATA'
    );
  }
  downloadPdf() {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#myReporte',
      body: [
        [
          {
            content: 'Text',
            colSpan: 2,
            rowSpan: 2,
            styles: { halign: 'center' },
          },
        ],
      ],
    });
    // let date: Date = new Date();
    // doc.autoTable({ html: '#myReporte' });
    doc.save('Alertas.pdf');
    // doc.save(
    //   'Reporte de Alertas ' +
    //     this.dataPagination.length +
    //     ' registros, descargado ' +
    //     date.toLocaleString() +
    //     ' .pdf'
    // );
  }
  randomEdad() {
    var min = 15;
    var max = 60;
    var x = Math.random() * (max - min) + min;
    return Math.round(x);
  }
  randomTentativa() {
    var min = 1;
    var max = 4;
    var x = Math.random() * (max - min) + min;
    var valor = 'vacio';
    switch (Math.round(x)) {
      case 1:
        valor = 'Leve';
        break;
      case 2:
        valor = 'Medio';
        break;
      case 3:
        valor = 'Grave';
        break;
      default:
        console.log('Error!');
        break;
    }
    return valor;
  }
}
