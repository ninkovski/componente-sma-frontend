import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { TipoEstablecimientoPost, TipoEstablecimientoPut } from '../../../interfaces/tipo-establecimiento.interface';
import { TipoEstablecimientoService } from '../../../services/tipo-establecimiento.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-tipo-establecimiento',
  templateUrl: './form-tipo-establecimiento.component.html',
  styleUrls: ['./form-tipo-establecimiento.component.scss']
})
export class FormTipoEstablecimientoComponent implements OnInit {

  	@Input() public data;
  	myform: FormGroup = this.formBuilder.group({
	    id: [null,[]],
	    nombre: [null,[Validators.required, Validators.minLength(3), 
	    	Validators.maxLength(80)]],
	    nombre_plural: [null,[Validators.required, Validators.minLength(3), 
	    	Validators.maxLength(90)]],
	    abreviatura: [null,[Validators.required, Validators.minLength(3), 
	    	Validators.maxLength(12)]],
	    orden: [1,[Validators.required, Validators.min(1), 
	    	Validators.max(1000)]],
	    estado: ['1',[Validators.required,]],
	});
  	cargado: boolean = false;
  	titulo: string = 'Nuevo';
  	icon: string = 'bx bx-plus';
  	accion: string = 'REGISTRAR';
  	saving: boolean = false;
  	estados = [{codigo:'1',nombre:'Activo'},{codigo:'0',nombre:'Desactivo'}];
  	// $subject: Subject<string> = new Subject<string>();
  	constructor(
  		private testService: TipoEstablecimientoService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		if(this.data?.id){
  			this.icon = 'bx bx-create';
  			this.titulo = 'Editar';
  			this.accion = 'ACTUALIZAR';
  			this.getEdit();
  		}else{
  			this.cargado = true;
  		}
    	// this.$subject.pipe(debounceTime(600)).subscribe((nombre: string) => this.getExisteDeli(nombre));
  	}

  	getEdit(){
  		this.testService.edit(this.data.id).subscribe(
	      res=> {
	         this.myform.patchValue(res.resultado);
	         this.cargado = true;
	      },
	      error=> {
	        this.msgs.error(error);
	        this.cargado = true;
	      }
	    );
  	}

  	cancel() {
  		Swal.fire({
          text: "¿Está seguro de cancelar el proceso de registro?",
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

  	saveOrUpdate(){
	  	if(this.myform.valid){
	  		if(!this.data){
		  		Swal.fire({
		          // title: 'Registrar tipo de establecimiento',
		          text: "¿Está seguro de registrar el tipo de establecimiento?",
		          icon: 'info',
		          iconColor:'#577c9e',
		          showCancelButton: true,
		          reverseButtons: true,
		          confirmButtonColor: '#264867',
		          cancelButtonColor: '#26486794',
		          confirmButtonText: 'SI, REGISTRAR',
		          cancelButtonText: "NO REGISTRAR",
		        }).then((result) => {
		          if (result.value) {
			            let testPost: TipoEstablecimientoPost = Object.assign({}, this.myform.value);
			            this.saving = true;
				        this.testService.add(testPost).subscribe(
				          res=> {
				            this.toastr.success("Tipo de establecimiento registrado correctamente","Registrado");
				            this.activeModal.close(res);
				          },
				          error=>{
				          	this.saving = false;
				            this.msgs.error(error);
				          }
				        );
				    }
		        });
		    }
		    else{
		    	Swal.fire({
		          // title: 'Registrar tipo de establecimiento',
		          text: "¿Está seguro de actualizar el tipo de establecimiento?",
		          icon: 'info',
		          iconColor:'#577c9e',
		          showCancelButton: true,
		          reverseButtons: true,
		          confirmButtonColor: '#264867',
		          cancelButtonColor: '#26486794',
		          confirmButtonText: 'SI, ACTUALIZAR',
		          cancelButtonText: "NO ACTUALIZAR",
		        }).then((result) => {
		          if (result.value) {
			            let testPut: TipoEstablecimientoPut = Object.assign({}, this.myform.value);
			            this.saving = true;
				        this.testService.update(testPut).subscribe(
				          res=> {
				            this.toastr.success("Tipo de establecimiento actualizado correctamente","Actualizado");
				            this.activeModal.close(res);
				          },
				          error=>{
				          	this.saving = false;
				            this.msgs.error(error);
				          }
				        );
				    }
		        });
		    }    
	  	}else{
	  		this.toastr.error("El formulario no es válido.");
	  	}
  	}
}