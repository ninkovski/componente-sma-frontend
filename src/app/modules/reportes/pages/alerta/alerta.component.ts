import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RespuestaAlertas } from '../../interfaces/respuesta-alertas';
import { DownloadService } from 'src/app/shared/services/download.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {
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
}
