import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  updateAlertaAnio = false;
  updateAlertaPeriodo = false;
  updateDistritoAnio = false;
  updateDistritoPeriodo = false;
  updateVictimeAnio = false;
  updateVictimePeriodo = false;
  updateVictimaDistritoAnio = false;
  updateVictimaDistritoPeriodo = false;

  parametro: {
    fecha_inicio: Date,
    fecha_fin: Date
  } = {
    fecha_inicio: new Date(),
    fecha_fin: new Date()
  };

  highCharts: typeof HighCharts = HighCharts;
  chartAlertasAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO ALERTAS EMITIDAS POR AÑO" },
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
  chartAlertasPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO ALERTAS EMITIDAS POR PERIODO" },
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
  chartDistritoAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO ALERTAS EMITIDAS POR DISTRITO FISCAL (AÑO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend:{ enabled:false }
  };
  chartDistritoPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO ALERTAS EMITIDAS POR DISTRITO FISCAL (PERIODO)" },
    xAxis: { categories: [], title: { text: null } },
    yAxis: { title: { text: null } },
    series: [],
    legend:{ enabled:false }
  };
  chartVictimaAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO VICTIMAS CON DISPOSICION DE MEDIDAS DE PROTECCION POR AÑO" },
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
  chartVictimaPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO VICTIMAS CON DISPOSICION DE MEDIDAS DE PROTECCION POR PERIODO" },
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
  chartVictimaDistritoAnioOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO VICTIMAS CON DISPOSICION DE MEDIDAS PROTECCION POR DISTRITO FISCAL (AÑO)" },
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
  chartVictimaDistritoPeriodoOptions = {
    chart: { type: "column", reflow: true },
    title: { text: "NUMERO VICTIMAS CON DISPOSICION DE MEDIDAS PROTECCION POR DISTRITO FISCAL (PERIODO)" },
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
        `http://172.16.60.98:7007/api-integrador/dashboards/activacion-alerta-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
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

        this.chartAlertasAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAlertasAnioOptions.series = arraySerie;
        this.updateAlertaAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/activacion-alerta-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
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

        this.chartAlertasPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartAlertasPeriodoOptions.series = arraySerie;
        this.updateAlertaPeriodo = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/activacion-alerta-ranking-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          var data = [];
          respuesta.data.forEach((elemento) => {
            arrayYear.push(`${elemento.distrito}`);
            data.push(elemento.cantidad);
          });
          arraySerie.push({ type: 'column', data: data });
        }

        console.log(arrayYear);
        console.log(arraySerie);

        this.chartDistritoAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartDistritoAnioOptions.series = arraySerie;
        this.updateDistritoAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/activacion-alerta-ranking-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          var data = [];
          respuesta.data.forEach((elemento) => {
            arrayYear.push(`${elemento.periodo} - ${elemento.distrito}`);
            data.push(elemento.cantidad);
          });
          arraySerie.push({ type: 'column', data: data });
        }

        this.chartDistritoPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartDistritoPeriodoOptions.series = arraySerie;
        this.updateDistritoPeriodo = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/victimas-potenciales-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
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

        this.chartVictimaAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartVictimaAnioOptions.series = arraySerie;
        this.updateVictimeAnio = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/victimas-potenciales-periodo?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
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

        this.chartVictimaPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartVictimaPeriodoOptions.series = arraySerie;
        this.updateVictimePeriodo = true;
      });

    this.http
      .get(
        `http://172.16.60.98:7007/api-integrador/dashboards/victimas-potenciales-ranking-anio?anioInicio=${anioDesde}&anioFin=${anioHasta}`
      )
      .subscribe((respuesta: any) => {
        var arrayYear = [];
        var arraySerie = [];

        if (respuesta.metadata.status == 200 && respuesta.data.length > 0) {
          respuesta.data.forEach((elemento) => {
            var data = [];

            arrayYear.push(`${elemento.anio} - ${elemento.distrito}`);
            data.push(elemento.cantidad);
            arraySerie.push({
              name: `${elemento.anio} - ${elemento.distrito}`,
              type: 'column',
              data: data,
            });
          });
        }

        this.chartVictimaDistritoAnioOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartVictimaDistritoAnioOptions.series = arraySerie;
        this.updateVictimaDistritoAnio = true;
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

        this.chartVictimaDistritoPeriodoOptions.xAxis = {
          categories: arrayYear,
          title: {
            text: null,
          },
        };
        this.chartVictimaDistritoPeriodoOptions.series = arraySerie;
        this.updateVictimaDistritoPeriodo = true;
      });
  }
}
