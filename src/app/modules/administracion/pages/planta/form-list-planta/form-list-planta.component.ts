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
import { FormListAmbienteComponent } from '../../ambiente/form-list-ambiente/form-list-ambiente.component';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-list-planta',
  templateUrl: './form-list-planta.component.html',
  styleUrls: ['./form-list-planta.component.scss']
})
export class FormListPlantaComponent implements OnInit {

  	@Input() public data: Establecimiento;
  	myform: FormGroup = this.formBuilder.group({
	    establecimiento_id: [null,[]],
	    plantas: this.formBuilder.array([])
	});
  	cargado: boolean = false;
  	titulo: string = '';
  	icon: string = 'bx bx-layer-plus';
  	accion: string = 'GUARDAR';
  	saving: boolean = false;
  	tiposplanta: TipoPlanta[] = [];
  	si_no = [{codigo:'SI', nombre:'SI'},{codigo:'NO', nombre:'NO'}];
  	estados = [{codigo:'1',nombre:'Activo'},{codigo:'0',nombre:'Desactivo'}];
  	codigos = [];
  	nro_dupl = 0;
  	duplicidad: boolean = false;
  	// $subject: Subject<string> = new Subject<string>();
  	constructor(
  		private plaService: PlantaService,
  		private tplaService: TipoPlantaService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		this.getTiposplanta();
  		this.myform.get("establecimiento_id").setValue(this.data.id);
  		this.getPlantas();
  		// if(this.data?.id){
  		// 	this.icon = 'bx bx-create';
  		// 	this.titulo = 'Editar';
  		// 	this.accion = 'ACTUALIZAR';
  		// 	this.getEdit();
  		// }else{
  		// 	this.cargado = true;
  		// }
    	// this.$subject.pipe(debounceTime(600)).subscribe((nombre: string) => this.getExisteDeli(nombre));
  	}

  	getPlantas(){
  		this.plaService.edit(this.data.id).subscribe(
	      res=> {
	         // this.myform.get('plantas').patchValue(res.resultado);
	         this.loadArrays(res.resultado);
	         this.cargado = true;
	      },
	      error=> {
	        this.msgs.error(error);
	        this.cargado = true;
	      }
	    );
  	}

  	loadArrays(plantas){
  		// console.log("Obj: "+obj);
	    var control = <FormArray>this.myform.controls['plantas'];
	    for (var i = 0; i < plantas.length; i++) {
	        this.addPlantaEdit(plantas[i]);
	        control.at(i).patchValue(plantas[i]);
	    }
	}

	addPlantaEdit(planta){
	    const plantas = this.myform.get('plantas') as FormArray;
	    plantas.push(this.initNewPlantaEdit(planta))
	    this.myform.markAllAsTouched(); 
	}

	initNewPlantaEdit(planta): FormGroup {
		var validatons = [Validators.min(1), Validators.max(100)];
		if(planta['tiene_nro'] == 'SI'){
			validatons.push(Validators.required);
		}
		var myformPla: FormGroup = this.formBuilder.group({
	    	id:[null, []],
	    	tipo_planta_id: [null,[Validators.required]],
	    	tipo_planta_nombre: [null,[]],
	      	numero: [null, validatons],
	      	color: [null, [Validators.maxLength(15)]],
	      	tiene_salida: ['NO', [Validators.maxLength(2)]],
	      	tiene_nro: ['NO',[]],
	      	orden: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
	      	estado: ['1',[Validators.required]],
	      	ambientes: [[],[]]
	    });
	    return myformPla;
	};

  	cancel() {
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
  	}

  	changeText(event, campo){
  		let valor = event.target.value;
  		valor = this.utils.valInput(valor);
  		this.myform.get(campo).setValue(valor);
  		// this.$subject.next(valor);
  	}

  	getTiposplanta(){
	    var filtro: TplaFiltSearch = TplaFiltSearch.inicial("","","1");
	    filtro.ordering = 'orden';
	    this.tplaService.search(filtro).subscribe(
	      res=> {
	         this.tiposplanta = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

	getDatos(tipo_planta_id){
		var tiene_nro = 'NO';
		var nombre = '';
		for (var i=0; i< this.tiposplanta.length; i++) {
			var tplanta: TipoPlanta = this.tiposplanta[i];
			if(tplanta.id == tipo_planta_id){
				tiene_nro = tplanta.tiene_nro;
				nombre = tplanta.nombre;
				break;
			}
		}
		return {'tiene_nro': tiene_nro, 'nombre':nombre};
	}

	changeTplanta(valor, form: FormGroup){
		if(valor){
			var datos = this.getDatos(valor);
			form.get("tiene_nro").setValue(datos.tiene_nro);
			form.get("tipo_planta_nombre").setValue(datos.nombre);
			form.get("numero").clearValidators();
			if(datos.tiene_nro == 'SI'){
				form.get("numero").setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
			}
			form.get("numero").updateValueAndValidity();
		}
		this.validDupli(this.myform.value.plantas);
	}

  	initNewPlanta(): FormGroup {
		var myformPla: FormGroup = this.formBuilder.group({
	    	id:[null, []],
	    	tipo_planta_id: [null,[Validators.required]],
	    	tipo_planta_nombre: [null,[]],
	      	numero: [null, [Validators.min(1), Validators.max(100)]],
	      	color: [null, [Validators.maxLength(15)]],
	      	tiene_salida: ['NO', [Validators.maxLength(2)]],
	      	tiene_nro: ['NO',[]],
	      	orden: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
	      	estado: ['1',[Validators.required]],
	      	ambientes: [[],[]]
	    });
	    return myformPla;
	};

  	addPlanta(){
	    const plantas = this.myform.get('plantas') as FormArray;
	    plantas.push(this.initNewPlanta())
	    this.myform.markAllAsTouched(); 
	}

	nroDuplicidad(codigo, listado){
        var index = 0;
        for(var i = 0; i < listado.length; i++) {
	      	var item = listado[i];
	      	if(item['codigo'] && item['codigo'].toUpperCase() == codigo.toUpperCase()){
               index += 1; 
            }
	    }
        return index;
    };

	validDupli(listado){
		this.codigos = [];
        this.nro_dupl = 0;

        for (var i = 0; i < listado.length; i++) {
	      	var item = listado[i];
	      	if(item['tipo_planta_id']){
	      		var codigo = item['tipo_planta_id'].toString();
	      		if(item.tiene_nro == 'SI'){
	      			if(item['numero']){
	      				codigo += " "+item['numero'].toString();
	      				listado[i]['codigo'] = codigo;
	      			}else{
	      				listado[i]['codigo'] = null;
	      			}
	      		}else{
	      			listado[i]['codigo'] = codigo;
	      		}
	      		
            }else{
                listado[i]['codigo'] = null;
            }
	  	}

        for (var i = 0; i < listado.length; i++) {
	      	var item = listado[i];
	      	if(item['codigo']){
                var nros = this.nroDuplicidad(item['codigo'], listado);
                if(nros>1){
                    item['dupli'] = true;
                    this.nro_dupl += 1;
                }else{
                    item['dupli'] = false;
                }
            }else{
                item['dupli'] = false;
            }
            this.codigos.push(item);
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


  	addAmbientes(index: number, form: FormGroup){
  		console.log("Form: ", form.value);
	    const dialogRef = this.modalService.open(FormListAmbienteComponent, {
	      scrollable: true,
	      centered: true,
	      // modalDialogClass:'bg-modal-super',
	      // windowClass: 'bg-mpfn',
	      windowClass:'bg-modal-super',
	      // size: 'sm', //'sm' | 'lg' | 'xl'
	      size: 'xl',
	      keyboard:true, // escape,
	      backdrop: 'static'
	      // backdrop: true
	      });
	    dialogRef.componentInstance.data = {'establecimiento':this.data, planta: form.value};
	    dialogRef.result.then((ambientes) => {
	    	form.get("ambientes").setValue(ambientes);
	    }, (reason) => {
	      
	    });
	}

  	saveOrUpdate(){
	  	if(this.myform.valid){
	  		Swal.fire({
	          // title: 'Registrar tipo de establecimiento',
	          text: "¿Está seguro de guardar los datos ingresados?",
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
		            let plaRequest: PlantaRequest = Object.assign({}, this.myform.value);
		            this.saving = true;
			        this.plaService.add(plaRequest).subscribe(
			          res=> {
			            this.toastr.success("Se han guardado las plantas y ambientes del establecimiento.",
			            	"Plantas y ambientes");
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