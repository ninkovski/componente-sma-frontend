import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { TipoAmbiente, TambFiltSearch } from '../../../interfaces/tipo-ambiente.interface';
import { TipoAmbienteService } from '../../../services/tipo-ambiente.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-list-ambiente',
  templateUrl: './form-list-ambiente.component.html',
  styleUrls: ['./form-list-ambiente.component.scss']
})
export class FormListAmbienteComponent implements OnInit {

  	@Input() public data;
  	myform: FormGroup = this.formBuilder.group({
	    ambientes: this.formBuilder.array([])
	});
  	cargado: boolean = false;
  	titulo: string = '';
  	icon: string = 'bx bx-dice-4';
  	accion: string = 'GUARDAR';
  	saving: boolean = false;
  	tiposambiente: TipoAmbiente[] = [];
  	estados = [{codigo:'1',nombre:'Activo'},{codigo:'0',nombre:'Desactivo'}];
  	codigos = [];
  	nro_dupl = 0;
  	duplicidad: boolean = false;
  	// $subject: Subject<string> = new Subject<string>();
  	constructor(
  		private tambService: TipoAmbienteService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		this.getTiposambiente();
  		this.getAmbientes();
  	}

  	getAmbientes(){
  		this.cargado = true;
  		this.loadArrays(this.data.planta.ambientes);
  	}

  	loadArrays(ambientes){
	    var control = <FormArray>this.myform.controls['ambientes'];
	    for (var i = 0; i < ambientes.length; i++) {
	        this.addAmbienteEdit(ambientes[i]);
	        control.at(i).patchValue(ambientes[i]);
	    }
	}

	addAmbienteEdit(planta){
	    const ambientes = this.myform.get('ambientes') as FormArray;
	    ambientes.push(this.initNewAmbiente(0))
	    this.myform.markAllAsTouched(); 
	}

  	cancel() {
  		Swal.fire({
          text: "¿Está seguro de cancelar el proceso de registro de ambientes?",
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

  	changeText(event, form: FormGroup, campo: string){
  		let valor = event.target.value;
  		valor = this.utils.valInput(valor);
  		form.get(campo).setValue(valor);
  		// this.$subject.next(valor);
  	}

  	changeNumero(listado, event, form: FormGroup, campo: string){
  		let valor = event.target.value;
  		valor = this.utils.valInput(valor);
  		form.get(campo).setValue(valor);
  		this.validDupli(listado);
  	}

  	getTiposambiente(){
	    var filtro: TambFiltSearch = TambFiltSearch.inicial("","","1");
	    filtro.ordering = 'orden,nombre';
	    this.tambService.search(filtro).subscribe(
	      res=> {
	         this.tiposambiente = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

  	initNewAmbiente(tam): FormGroup {
		var myformPla: FormGroup = this.formBuilder.group({
	    	id:[null, []],
	    	tipo_ambiente_id: [null,[Validators.required]],
	      	numero: [null, [Validators.maxLength(8)]],
	      	nombre: [null, [Validators.maxLength(100)]],
	      	aforo: [null, [Validators.min(0), Validators.max(50000)]],
	      	area_mts2: [null, [Validators.min(0), Validators.max(60000)]],
	      	puertas: [null, [Validators.min(1), Validators.max(24)]],
	      	orden: [tam+1, [Validators.required, Validators.min(1), Validators.max(100)]],
	      	estado: ['1',[Validators.required]], 
	    });
	    return myformPla;
	};

  	addAmbiente(){
	    const ambientes = this.myform.get('ambientes') as FormArray;
	    var tam = this.myform.value.ambientes.length;
	    ambientes.push(this.initNewAmbiente(tam));
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
	      	if(item['tipo_ambiente_id']){
	      		var codigo = item['tipo_ambiente_id'].toString();
	      		if(item['numero']){
	      			codigo += " "+item['numero'];
	      			listado[i]['codigo'] = codigo;
      			}
	      		listado[i]['codigo'] = codigo.trim();
            }else{
                listado[i]['codigo'] = null;
            }
	  	}

        for (var i = 0; i < listado.length; i++) {
	      	var item = listado[i];
	      	if(item['codigo'] && item['numero']){
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

	delAmbiente(index:number, item: any){
	    // if(item['id']){
	    //     this.del_detalles.push(item['id']);
	    // }
	    
	    Swal.fire({
          text: "¿Está seguro de eliminar el tipo de ambiente seleccionado?",
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
	            var control = <FormArray>this.myform.controls['ambientes'];
	    		control.removeAt(index);
		    }
      	});
  	};

  	saveOrUpdate(){
	  	if(this.myform.valid){
	  		Swal.fire({
	          // title: 'Registrar tipo de establecimiento',
	          text: "¿Está conforme los ambientes?",
	          icon: 'info',
	          iconColor:'#577c9e',
	          showCancelButton: true,
	          reverseButtons: true,
	          confirmButtonColor: '#264867',
	          cancelButtonColor: '#26486794',
	          confirmButtonText: 'SI, CONFORME',
	          cancelButtonText: "NO CONFORME",
	        }).then((result) => {
	          	if (result.value) {
	          		var obj = Object.assign({}, this.myform.value)
	          		this.activeModal.close(obj.ambientes);
			    }
	        });   
	  	}else{
	  		this.toastr.error("El formulario no es válido.");
	  	}
  	}


  
}