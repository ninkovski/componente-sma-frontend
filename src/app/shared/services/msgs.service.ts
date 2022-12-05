import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MsgsService {

  constructor(private toastr: ToastrService) { 
  }

  error(error) {
  	if(error.status !== 401 && error.status !== 403){
  		if(error.status == 405 && typeof error.error === 'object'){
        this.toastr.error(error.error.message, error.error.error);
      }else{
        
        if(typeof error.error.estado === 'object'){
          this.toastr.error(error.error.estado.mensaje, "Error "+error.error.estado.estado, {enableHtml: true,closeButton: true,timeOut: 8000});
        }else{
          if(typeof error.error === 'object'){
            if(error.error && error.error.mensaje){
              this.toastr.error(error.error.mensaje, "Código: "+error.error.codigo,
                    {enableHtml: true,closeButton: true,timeOut: 8000});
            }else{
              if(Array.isArray(error.error)){
                this.toastr.error(error.error[0], "Código: "+error.status,
                  {enableHtml: true,closeButton: true,timeOut: 8000});
              }else{
                  this.toastr.error(error.error.error+" "+error.error.path, "Código: "+error.status,
                    {enableHtml: true,closeButton: true,timeOut: 8000});
              }
            }
          }else{
              this.toastr.error(error.error, "Error", {enableHtml: true,closeButton: true,timeOut: 8000});
          }
        }
      }
  	}else{
      if(error.status == 403){
        if(typeof error.error === 'object'){
          var error_ = error['error'];
          this.toastr.error(error_.mensaje, error_.codigo, {enableHtml: true,closeButton: true,timeOut: 8000});
        }
      }
      if(error.status == 401){
        if(typeof error.error === 'object'){
          var error_ = error['error'];
          this.toastr.error(error_.mensaje, error_.codigo, {enableHtml: true,closeButton: true,timeOut: 8000});
        }
      }
    }
  }

}
