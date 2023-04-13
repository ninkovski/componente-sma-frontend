import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectInterface } from 'src/app/modules/alerta/interfaces/select-interface';

@Component({
  selector: 'app-reca-print',
  templateUrl: './reca-print.component.html',
  styleUrls: ['./reca-print.component.scss'],
})
export class RecaPrintComponent implements OnInit {
  catalogo: SelectInterface[] = [];
  violenciaCatalogo: SelectInterface[] = [];
  asistenciaCatalogo: SelectInterface[] = [];
  estadoProcesalCatalogo: SelectInterface[] = [];
  delitoCatalogo: SelectInterface[] = [];
  situacionJuridicaImputadoCatalogo: SelectInterface[] = [];
  lugarOcurrenciaCatalogo: SelectInterface[] = [];
  movilCatalogo: SelectInterface[] = [];
  tipoDocumentoCatalogo: SelectInterface[] = [];
  nivelEducativoCatalogo: SelectInterface[] = [];
  siNoCatalogo: SelectInterface[] = [];
  estadoCivilCatalogo: SelectInterface[] = [];
  ocupacionCatalogo: SelectInterface[] = [];
  relacionAgresorCatalogo: SelectInterface[] = [];
  vinculoVictimaCatalogo: SelectInterface[] = [];
  discapacidadCatalogo: SelectInterface[] = [];
  institucionCatalogo: SelectInterface[] = [];
  idiomasCatalogo: SelectInterface[] = [];
  etniasCatalogo: SelectInterface[] = [];

  modelFicha = {
    idTbFichaReca: 0,
    genDistJudicial: '',
    genUdavitUavit: '',
    genNumFicha: 0,
    genFecFicha: '',
    genBeneficiaria: 0,
    genBeneficiariaFecha: '',
    genNumCarpetaAsist: 0,
    genNombreAbogago: '',
    genTSocial: '',
    genPsicologo: '',
    genMedioDeComuni: 0,
    genNombreMedio: '',
    genFecPublic: '',

    victNomApell: '',
    victIdTbNacionalidad: 0,
    victTipDocu: 0,
    victNDni: 0,
    victDepartamento: '01', // TODO: Pendiente
    victProvincia: '0101', // TODO: Pendiente
    victDistirto: '010101', // TODO: Pendiente
    victFecNacimiento: '',
    victTelfFijo: '',
    victCelular: 0,
    victEmail: '',
    victDominicilio: '',
    victIdioma: 0,
    victEtnia: 0,
    victHjos: 0,
    victGestando: 0,
    victGestandoMeses: 0,
    victEstadoCivil: 0,
    victEstadoCivilOtro: '', // TODO: Pendiente
    victNEducativo: 0,
    victTrabaja: 0,
    victOcupacion: 0,
    victOcupacionOtros: '', // TODO: Pendiente
    victCentroTrab: '',
    victRemuneracion: 0,
    victDiscapacidad: 0,
    victDiscapacidadDes: 0, // TODO: Observacion
    victAccSalud: 0,
    victAccSaludDetalle: '',
    victRelaAgresora: 0,
    victRelaAgresoraDetalle: '', // TODO: Pendiente

    victDepNomApell: '',
    victDepNacionalidad: 0,
    victDepTipDocumento: 0,
    victDepNDni: 0, // TODO: Observacion tipo de dato
    victDepEdad: 0,
    victDepDomicilio: '',
    victDepNivelEd: 0,
    victDepEstu: 0,
    victDepEstuTip: 0,
    victDepNomEdu: '',
    victDepEstuAno: '',
    victDepTrabaja: 0,
    victDepOcupacion: 0,
    victDepRemunerado: 0, // TODO: Observacion
    victDepCentTrabajo: '',
    victDepDiscapacidad: 0,
    victDepDiscapacidadDes: 0,
    victDepRelaDirect: 0,
    victDepRelaDirectDetalle: '', // TODO: Pendiente

    victDep2NomApell: '',
    victDep2Nacionalidad: 0,
    victDep2TipDocumento: 0,
    victDep2NDni: 0, // TODO: Observacion tipo de dato
    victDep2Edad: 0,
    victDep2Domicilio: '',
    victDep2NivelEdu: 0,
    victDep2Estu: 0,
    victDep2EstuTip: 0,
    victDep2NomEdu: '',
    victDep2EstuAno: '',
    victDep2Trabaja: 0,
    victDep2Ocupacion: 0,
    victDep2Remunerado: 0, // TODO: Observacion, no existe
    victDep2CentTrabajo: '',
    victDep2Discapacidad: 0,
    victDep2DiscapacidadDes: 0,
    victDep2RelaDirec: 0,
    victDep2RelaDirecDetalle: '', // TODO: Pendiente

    asistLegal: 0,
    asistSocial: 0,
    asistPsicologica: 0,
    asistInforEmit: '',
    asistAsistLegaDet: '',
    asistPsicologicaDet: '',
    asistSocialDet: '',

    aprePregunt1: 0,
    aprePregunt2: 0,
    aprePregunt3: 0,
    aprePregunt4: 0,
    aprePregunt5: 0,
    aprePregunt6: 0,
    aprePregunt7: '', // TODO: Pendiente

    udavitSolFiscal: 0,
    udavitSolFiscalDet: '',
    udavitInvestigacion: '',
    udavitAcciones: '',
    udavitDenucia: '',
    udavitMimp: '',
    udavitMinedu: '',
    udavitMinsa: '',
    udavitMire: '',
    udavitMinjus: '',
    udavitReinserLaboral: '',
    udavitOtros: '',
    contEstrategia: 0,
    contEstrategiaOp: 0,
    contEstrategiaOpDetalle: '',

    idAlerta: 0,
    fechaRegistro: new Date(),
    usuarioRegistro: "Demo",
    factoresRiesgo: []
  };

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.modelFicha.idTbFichaReca = params['id'];
    });

    this.getCatalogo(1); //
    this.getCatalogo(2);
    this.getCatalogo(3); //
    this.getCatalogo(4);
    this.getCatalogo(5); //
    this.getCatalogo(6); //
    this.getCatalogo(7); //
    this.getCatalogo(8); //
    this.getCatalogo(9); //
    this.getCatalogo(10); //
    this.getCatalogo(11); //
    this.getCatalogo(12);
    this.getCatalogo(13);
    this.getCatalogo(14);
    this.getCatalogo(15);
    this.getCatalogo(16);
    this.getCatalogo(17);
    this.getCatalogo(18);
  }

  ngOnInit(): void {
    console.log(this.modelFicha.idTbFichaReca);
    this.http
      .get(`http://localhost:8082/api-integrador/fichas-reca?codigo=${this.modelFicha.idTbFichaReca}`)
      .subscribe((respuesta: any) => {
        if (respuesta != null && respuesta.data.length == 1)  {
          this.modelFicha = respuesta.data[0];
        } else {
          this.router.navigate(['/reca-list']);
        }
      });
  }

  getCatalogo(catalogoID: number) {
    this.http
      .get('http://localhost:8082/api-integrador/catalogos', {
        params: {
          codigoPadre: catalogoID,
        },
      })
      .subscribe((respuesta: any) => {
        switch (catalogoID) {
          case 1:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.siNoCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 2:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.tipoDocumentoCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 3:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.estadoCivilCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 4:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.nivelEducativoCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 5:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.ocupacionCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 6:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.relacionAgresorCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 7:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.vinculoVictimaCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 8:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.discapacidadCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 9:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.institucionCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 10:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.idiomasCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 11:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.etniasCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 12:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.delitoCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 13:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.violenciaCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 14:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.asistenciaCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 15:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.estadoProcesalCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 16:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.situacionJuridicaImputadoCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 17:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.lugarOcurrenciaCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
          case 18:
            if (respuesta.data.length > 0) {
              respuesta.data.forEach((element) => {
                this.movilCatalogo.push({
                  id: element.idSubGrupo,
                  descripcion: element.descripcion,
                });
              });
            }
            break;
        }
      });
  }

  Immprimir() {
    // window.print();
    var printContent = document.getElementsByClassName("print")[0].innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
}
