import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-dashboardii',
  templateUrl: './dashboardii.component.html',
  styleUrls: ['./dashboardii.component.scss'],
})
export class DashboardIIComponent implements OnInit {
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  parametro: {
    fecha_inicio: Date,
    fecha_fin: Date
  } = {
    fecha_inicio: new Date(),
    fecha_fin: new Date()
  };

  updateAccionAnio = false;
  updateAccionPeriodo = false;
  updateAsistenciaAnio = false;
  updateAsistenciaPeriodo = false;
  updateServicioAnio = false;
  updateServicioPeriodo = false;

  highCharts: typeof HighCharts = HighCharts;
  chartAccionAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO DE ACCIONES FISCALES POR TIPO (AÑO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };
  chartAccionPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO ACCIONES FISCALES POR TIPO (PERIODO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };
  chartAsistenciaAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO DE SERVICIO DE ASISTENCIA POR TIPO (AÑO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };
  chartAsistenciaPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO DE SERVICIO DE ASISTENCIA POR TIPO (PERIODO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };
  chartServicioAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO DE MEDIDAS DE PROTECCION POR TIPO (AÑO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };
  chartServicioPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO DE MEDIDAS DE PROTECCION POR TIPO (PERIODO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor: "#FFFFFF",
      shadow: true
    }
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }
  buscaIndicadores(): void {
    const fechaDesde = formatDate(this.parametro.fecha_inicio, this.format, this.locale);
    const fechaHasta = formatDate(this.parametro.fecha_fin, this.format, this.locale);
    const anioDesde = formatDate(this.parametro.fecha_inicio, "yyyy", this.locale);
    const anioHasta = formatDate(this.parametro.fecha_fin, "yyyy", this.locale);

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/acciones-fiscales-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.anio} - ${elemento.accion}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.anio}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartAccionAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAccionAnioOptions.series = arraySerie;
        this.updateAccionAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/victimas-potenciales-ranking-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.periodo} - ${elemento.distrito}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.periodo} - ${elemento.distrito}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartAccionPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAccionPeriodoOptions.series = arraySerie;
        this.updateAccionPeriodo = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/servicios-asistencia-udavit-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.anio}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.anio}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartAsistenciaAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAsistenciaAnioOptions.series = arraySerie;
        this.updateAsistenciaAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/servicios-asistencia-udavit-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.periodo}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.periodo}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartAsistenciaPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAsistenciaPeriodoOptions.series = arraySerie;
        this.updateAsistenciaPeriodo = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/medidas-proteccion-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.anio} - ${elemento.medidaProteccion}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.anio} - ${elemento.medidaProteccion}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartServicioAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartServicioAnioOptions.series = arraySerie;
        this.updateServicioAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/medidas-proteccion-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(
              `${elemento.periodo} - ${elemento.medidaProteccion}`
            );
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.periodo} - ${elemento.medidaProteccion}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartServicioPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartServicioPeriodoOptions.series = arraySerie;
        this.updateServicioPeriodo = true;
      });
  }
}
