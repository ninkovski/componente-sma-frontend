import { HttpClient } from '@angular/common/http';
import { OnInit, Component, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';

import { RespuestaAlertas } from '../../interfaces/respuesta-alertas';
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {
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
  /*  ArrayData: RespuestaAlertas[] = [];
  constructor(private http: HttpClient) {}
  dataSource = new MatTableDataSource<RespuestaAlertas>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;*/

  ngOnInit(): void {
    /*   this.getAlertas();
    //this.dataSource.paginator = this.paginator;*/
  }
  /* getAlertas() {
    this.http
      .get('http://localhost:8082/api-integrador/alertas')
      .subscribe((respuesta: any) => {
        this.ArrayData = respuesta.data;
        this.dataSource = new MatTableDataSource<RespuestaAlertas>(
          this.ArrayData
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  downloadPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#ReporteAlertas' });
    let date: Date = new Date();

    doc.save(
      'Reporte de Alertas ' +
        this.ArrayData.length +
        ' registros, descargado ' +
        date.toLocaleString() +
        ' .pdf'
    );
  }*/
}
