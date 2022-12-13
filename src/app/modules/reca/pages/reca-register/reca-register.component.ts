import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reca-register',
  templateUrl: './reca-register.component.html',
  styleUrls: ['./reca-register.component.scss']
})
export class RecaRegisterComponent implements OnInit {
  modelFicha = {
    "genDistJudicial": "",
    "genUdavitUavit": "",
    "genNumFicha": 0,
    "genFecFicha": "",
    "genBeneficiaria": 0,
    "genBeneficiariaFecha": "",
    "genNumCarpetaAsist": 0,
    "genNombreAbogago": "",
    "genTSocial": "",
    "genPsicologo": "",
    "genMedioDeComuni": 0,
    "genNombreMedio": "",
    "genFecPublic": "",
    
    "victNomApell": "",
    "victIdTbNacionalidad": 0,
    "victTipDocu": 0,
    "victNDni": 0,
    "victDepartamento": "01", // TODO: Pendiente
    "victProvincia": "0101", // TODO: Pendiente
    "victDistirto": "010101", // TODO: Pendiente
    "victFecNacimiento": "",
    "victTelfFijo": "",
    "victCelular": 0,
    "victEmail": "",
    "victDominicilio": "",
    "victIdioma": 0,
    "victEtnia": 0,
    "victHjos": 0,
    "victGestando": 0,
    "victGestandoMeses": 0,
    "victEstadoCivil": 0,
    "victEstadoCivilOtro": "", // TODO: Pendiente
    "victNEducativo": 0,
    "victTrabaja": 0,
    "victOcupacion": 0,
    "victOcupacionOtros": "", // TODO: Pendiente
    "victCentroTrab": "",
    "victRemuneracion": 0,
    "victDiscapacidad": 0,
    "victDiscapacidadDes": 0,  // TODO: Observacion
    "victAccSalud": 0,
    "victAccSaludDetalle": "",
    "victRelaAgresora": 0,
    "victRelaAgresoraDetalle": "", // TODO: Pendiente

    "victDepNomApell": "",
    "victDepNacionalidad": 0,
    "victDepTipDocumento": 0,
    "victDepNDni": 0, // TODO: Observacion tipo de dato
    "victDepEdad": 0,
    "victDepDomicilio": "",
    "victDepNivelEd": 0,
    "victDepEstu": 0,
    "victDepEstuTip": 0,
    "victDepNomEdu": "",
    "victDepEstuAno": "",
    "victDepTrabaja": 0,
    "victDepOcupacion": 0,
    "victDepRemunerado": 0, // TODO: Observacion
    "victDepCentTrabajo": "",
    "victDepDiscapacidad": 0,
    "victDepDiscapacidadDes": 0,
    "victDepRelaDirect": 0,
    "victDepRelaDirectDetalle": "", // TODO: Pendiente

    "victDep2NomApell": "",
    "victDep2Nacionalidad": 0,
    "victDep2TipDocumento": 0,
    "victDep2NDni": 0, // TODO: Observacion tipo de dato
    "victDep2Edad": 0,
    "victDep2Domicilio": "",
    "victDep2NivelEdu": 0,
    "victDep2Estu": 0,
    "victDep2EstuTip": 0,
    "victDep2NomEdu": "",
    "victDep2EstuAno": "",
    "victDep2Trabaja": 0,
    "victDep2Ocupacion": 0,
    "victDep2Remunerado": 0, // TODO: Observacion, no existe
    "victDep2CentTrabajo": "",
    "victDep2Discapacidad": 0,
    "victDep2DiscapacidadDes": 0,
    "victDep2RelaDirec": 0,
    "victDep2RelaDirecDetalle": "", // TODO: Pendiente

    "asistLegal": 0,
    "asistSocial": 0,
    "asistPsicologica": 0,
    "asistInforEmit": "",
    "asistAsistLegaDet": "",
    "asistPsicologicaDet": "",
    "asistSocialDet": "",

    "aprePregunt1": 0,
    "aprePregunt2": 0,
    "aprePregunt3": 0,
    "aprePregunt4": 0,
    "aprePregunt5": 0,
    "aprePregunt6": 0,
    "aprePregunt7": "", // TODO: Pendiente

    "udavitSolFiscal": 0,
    "udavitSolFiscalDet": "",
    "udavitInvestigacion": "",
    "udavitAcciones": "",
    "udavitDenucia": "",
    "udavitMimp": "",
    "udavitMinedu": "",
    "udavitMinsa": "",
    "udavitMire": "",
    "udavitMinjus": "",
    "udavitReinserLaboral": "",
    "udavitOtros": "",
    "contEstrategia": 0,
    "contEstrategiaOp": 0,
    "contEstrategiaOpDetalle": ""
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onClickRegister() {
    this.http
    .post("http://localhost:8082/api-integrador/fichas-reca", this.modelFicha)
    .subscribe((response: any) => {
      if (response.metadata.status == 200) {
        alert("Se registro ficha.");

        document.location.href = '/reca-list';
      }
    });
  }
}
