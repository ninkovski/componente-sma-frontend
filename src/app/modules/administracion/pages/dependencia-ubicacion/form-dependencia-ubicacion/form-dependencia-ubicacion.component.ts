import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { PlantaRequest } from '../../../interfaces/planta.interface';
import { PlantaService } from '../../../services/planta.service';
import { TipoPlanta, TplaFiltSearch } from '../../../interfaces/tipo-planta.interface';
import { Establecimiento } from '../../../interfaces/establecimiento.interface';
import { TipoPlantaService } from '../../../services/tipo-planta.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { AddDependenciaUbicacionComponent } from '../add-dependencia-ubicacion/add-dependencia-ubicacion.component';

import { DependenciaUbicacionEdit, DependenciaUbicacionRequest } from '../../../interfaces/dependencia-ubicacion.interface';
import { DependenciaUbicacionService } from '../../../services/dependencia-ubicacion.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-dependencia-ubicacion',
  templateUrl: './form-dependencia-ubicacion.component.html',
  styleUrls: ['./form-dependencia-ubicacion.component.scss']
})
export class FormDependenciaUbicacionComponent implements OnInit {

  	@Input() public data: Establecimiento;
  	myform: FormGroup = this.formBuilder.group({
	    dependencia_id: [null,[]],
	    ubicaciones:[[],[]]
	});
  	cargado: boolean = false;
  	titulo: string = '';
  	icon: string = 'bx bx-home-smile';
  	accion: string = 'GUARDAR CAMBIOS';
  	saving: boolean = false;
  	ubicaciones = [];
  	hay_cambios: boolean = false;
  	
  	codigos = [];
  	nro_dupl = 0;
  	duplicidad: boolean = false;
  	ids_delete: number[] = [];
  	// $subject: Subject<string> = new Subject<string>();
  	constructor(
  		private depUbiService: DependenciaUbicacionService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		this.myform.get("dependencia_id").setValue(this.data.id);
  		this.getUbicaciones();
  	}

  	getUbicaciones(){
  		this.depUbiService.edit(this.data.id).subscribe(
	      res=> {
	      	this.ubicaciones = res.resultado;
	         // this.myform.get('ubicaciones').patchValue(res.resultado);
	         this.cargado = true;
	      },
	      error=> {
	        this.msgs.error(error);
	        this.cargado = true;
	      }
	    );
  	}

  	cancel() {
  		if(this.hay_cambios){
  			Swal.fire({
	          text: "¿Está seguro de cancelar el proceso de registro de plantas?",
	          icon: 'warning',
	          iconColor: '#D9A927',
	          showCancelButton: true,
	          reverseButtons: true,
	          confirmButtonColor: '#264867',
	          cancelButtonColor: '#26486794',
	          cancelButtonText: "NO",
	          confirmButtonText: 'SI'
	        }).then((result) => {
	          if (result.value) {
		            this.activeModal.dismiss(null);
			    }
	      });
  		}else{
  			this.activeModal.dismiss(null);
  		}
  		
  	}

  	changeText(event, campo){
  		let valor = event.target.value;
  		valor = this.utils.valInput(valor);
  		this.myform.get(campo).setValue(valor);
  		// this.$subject.next(valor);
  	}

	nroDuplicidad(codigo, listado){
        var index = 0;
        for(var i = 0; i < listado.length; i++) {
	      	var item = listado[i];
	      	if(item['codigo'] == codigo){
               index += 1; 
            }
	    }
        return index;
    };

	validDupli(){
		this.nro_dupl = 0;

        for (var i = 0; i < this.ubicaciones.length; i++) {
	      	var item = this.ubicaciones[i];
	      	var codigo = item['establecimiento']['id'].toString();
	      	if(item['planta_id']){
	      		codigo += item['planta_id'].toString();
	      	}
	      	if(item['ambiente_id']){
	      		codigo += item['ambiente_id'].toString();
	      	}

	      	this.ubicaciones[i]['codigo'] = codigo;
	  	}

        for (var i = 0; i < this.ubicaciones.length; i++) {
	      	var item = this.ubicaciones[i];
            var nros = this.nroDuplicidad(item['codigo'], this.ubicaciones);
            if(nros>1){
                this.ubicaciones[i]['dupli'] = true;
                this.nro_dupl += 1;
            }else{
                this.ubicaciones[i]['dupli'] = false;
            }
	  	}
        this.duplicidad = (this.nro_dupl>0);
	}

	delPlanta(index:number, item: any){
	    // if(item['id']){
	    //     this.del_detalles.push(item['id']);
	    // }
	    

	    Swal.fire({
          text: "¿Está seguro de eliminar el tipo de planta seleccionado?",
          icon: 'warning',
          iconColor: '#D9A927',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#264867',
          cancelButtonColor: '#26486794',
          cancelButtonText: "NO",
          confirmButtonText: 'SI'
        }).then((result) => {
          if (result.value) {
	            var control = <FormArray>this.myform.controls['plantas'];
	    		control.removeAt(index);
		    }
      	});
  	};


  	addUbica(index, obj){
  		const dialogRef = this.modalService.open(AddDependenciaUbicacionComponent, {
	      scrollable: false,
	      centered: true,
	      windowClass:'bg-modal-super',
	      // size: 'sm', //'sm' | 'lg' | 'xl'
	      // size: 'xl',
	      keyboard:true, // escape,
	      backdrop: 'static'
	      // backdrop: true
	      });
	    dialogRef.componentInstance.data = obj;
	    dialogRef.result.then((estab) => {
	    	if(obj){
	    		this.ubicaciones[index] = estab;
	    		this.validDupli();
	    	}else{
	    		estab['orden'] = this.ubicaciones.length + 1;
	    		this.ubicaciones.push(estab);
	    		this.validDupli();
	    	}
	    	this.hay_cambios = true;
	    }, (reason) => {
	      
	    });
	}

	delUbica(index:number, item: any){
	    // if(item['id']){
	    //     this.del_detalles.push(item['id']);
	    // }
	    
	    if(item['id']){
	    	var nombre = item['establecimiento']['nombre'];
	    	if(item['planta_nombre']){
	    		nombre += ' - '+item['planta_nombre'];
	    	}
	    	Swal.fire({
	          text: "¿Está seguro de quitar al establecimiento: "+nombre+"?",
	          icon: 'warning',
	          iconColor: '#D9A927',
	          showCancelButton: true,
	          reverseButtons: true,
	          confirmButtonColor: '#264867',
	          cancelButtonColor: '#26486794',
	          cancelButtonText: "NO",
	          confirmButtonText: 'SI'
	        }).then((result) => {
	          if (result.value) {
	          		this.ids_delete.push(item['id']);
		            this.ubicaciones.splice(index, 1);
		            this.hay_cambios = true;
		            this.validDupli();
			    }
	      	});
	    }else{
	    	this.ubicaciones.splice(index, 1);
	    	this.hay_cambios = true;
	    	this.validDupli();
	    }
	    
  	};

  	saveOrUpdate(){
	  	if(this.myform.valid){
	  		Swal.fire({
	          // title: 'Registrar tipo de establecimiento',
	          text: "¿Está seguro de guardar los cambios realizados?",
	          icon: 'info',
	          iconColor:'#577c9e',
	          showCancelButton: true,
	          reverseButtons: true,
	          confirmButtonColor: '#264867',
	          cancelButtonColor: '#26486794',
	          confirmButtonText: 'SI, GUARDAR',
	          cancelButtonText: "NO GUARDAR",
	        }).then((result) => {
	          if (result.value) {
		            var depUbiRequest: DependenciaUbicacionRequest = Object.assign({}, this.myform.value);
		            
		            for (var i = 0; i < this.ubicaciones.length; i++) {
				      	var item = this.ubicaciones[i];
			            this.ubicaciones[i]['establecimiento_id'] = item['establecimiento']['id'];
				  		this.ubicaciones[i]['orden'] = i+1;
				  	}
		            depUbiRequest.ubicaciones = this.ubicaciones;
		            depUbiRequest.ids_delete = this.ids_delete;
		            this.saving = true;
			        this.depUbiService.add(depUbiRequest).subscribe(
			          res=> {
			            this.toastr.success("Se han guardado los cambios realizados.",
			            	"Cambios guardados");
			            this.activeModal.close(res);
			          },
			          error=>{
			          	this.saving = false;
			            this.msgs.error(error);
			          }
			        );
			    }
	        });   
	  	}else{
	  		this.toastr.error("El formulario no es válido.");
	  	}
  	}


  
}