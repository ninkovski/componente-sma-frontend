import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  	constructor() { }

  	dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    }

    dateBackend(fecha: string): string {
      let fechas = fecha.split("-");
      let dd = parseInt(fechas[0]);
      let mm = parseInt(fechas[1]);
      let yy = parseInt(fechas[2]);

      let yy_ = fechas[2];
      var mm_ = "";
      var dd_ = "";
      if(dd<10){
        dd_= "0"+dd;
      }else{
        dd_ = ""+dd;
      }
      if(mm<10){
        mm_= "0"+mm;
      }else{
        mm_ = ""+mm;
      }
      return yy_+"-"+mm_+"-"+dd_;
    };

    dateFrontend(fecha: string): string {
    	let fechas = fecha.split("-");
      	let yy = parseInt(fechas[0]);
      	let mm = parseInt(fechas[1]);
      	let dd = parseInt(fechas[2]);
      	return dd+"-"+mm+"-"+yy;
    }

    dateddMMyyy(fecha: string): string {
      let fechas = fecha.split("-");
      let yy = fechas[0];
      let mm = fechas[1];
      let dd = fechas[2];
      return dd+"/"+mm+"/"+yy;
    };

    valInput(valor) {
      let exisEsp = valor.endsWith(" ");
      valor = valor.trim();
      if(exisEsp && valor){
        valor += ' ';
      }
      if(valor){
        valor = valor.replace('    ',' ').replace('   ',' ').replace('  ',' ')
      }
      return valor;
    }

}