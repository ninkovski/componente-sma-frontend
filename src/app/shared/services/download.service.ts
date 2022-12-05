import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver-es';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

  	constructor() { }

  	// dataURItoBlob(dataURI) {
   //    var byteString = atob(dataURI.split(',')[1]);
   //    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
   //    var ab = new ArrayBuffer(byteString.length);
   //    var ia = new Uint8Array(ab);
   //    for (var i = 0; i < byteString.length; i++) {
   //      ia[i] = byteString.charCodeAt(i);
   //    }
   //    var blob = new Blob([ab], { type: mimeString });
   //    return blob;
   //  }

  public exportExcel(tablaId, nombreFile, hoja): void {
    var ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      tablaId, {raw:true, dateNF:'dd/mm/yyyy;@',
      cellDates:true});
    var Sheets = {};
    Sheets[hoja+""] = ws;
    var wb: XLSX.WorkBook = {
      Sheets: Sheets, 
      SheetNames: [hoja+""] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', 
      type: 'array'});
    this.saveExcelFile(excelBuffer, nombreFile);
  }

  public exportExcelJson(listadoJson, nombreFile, hoja): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listadoJson,
      {dateNF:'dd/mm/yyyy;@', cellDates:true});
    var Sheets = {};
    Sheets[hoja+""] = ws;
    const wb: XLSX.WorkBook = { Sheets: Sheets, SheetNames: [hoja+""] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, nombreFile);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  // public dowExcel(): void{
  //   var blob = new Blob(['\ufeff',document.getElementById("myTable").innerHTML], {
  //       type: "text/plain;charset=utf-8;"
  //   });
  //   var nombre_file = 'Categorías.xls';
  //   FileSaver.saveAs(blob, nombre_file);
  // };

  public dowTxt(data: string, nombre: string){
    const blob = new Blob([data], { type: 'text/plain' });
    const downloadAncher = document.createElement("a");
    downloadAncher.style.display = "none";
    const fileURL = URL.createObjectURL(blob);
    downloadAncher.href = fileURL;
    downloadAncher.download = nombre+".txt";
    downloadAncher.click();
  }

}