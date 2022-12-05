import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map,
	switchMap, tap, finalize, startWith } from 'rxjs/operators';
import { EstablecimientoPost, EstablecimientoPut } from '../../../interfaces/establecimiento.interface';
import { EstablecimientoService } from '../../../services/establecimiento.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DistritoFiscal, DfFiltSearch } from '../../../../maestras/interfaces/distrito-fiscal.interface';
import { DistritoFiscalService } from '../../../../maestras/services/distrito-fiscal.service';
import { Ubigeo, UbiFiltSearch } from '../../../../maestras/interfaces/ubigeo.interface';
import { UbigeoService } from '../../../../maestras/services/ubigeo.service';
import { TipoEstablecimiento, TestFiltSearch } from '../../../interfaces/tipo-establecimiento.interface';
import { TipoEstablecimientoService } from '../../../services/tipo-establecimiento.service';
import { RequireMatch } from '../../../../../shared/services/validates';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-establecimiento',
  templateUrl: './form-establecimiento.component.html',
  styleUrls: ['./form-establecimiento.component.scss']
})
export class FormEstablecimientoComponent implements OnInit {

  	@Input() public data;

  	// Autocomplete
  	@ViewChild('instance', {static: true}) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	focus2$ = new Subject<string>();
	keyup2$ = new Subject<string>();
	searching = false;

  	myform: FormGroup = this.formBuilder.group({
	    id: [null,[]],
	    distrito_fiscal_id: [null,[Validators.required]],
	    tipo_establecimiento_id: [null,[Validators.required]],
	    nombre: [null,[Validators.required, Validators.minLength(3), 
	    	Validators.maxLength(90)]],
	    abreviatura: [null,[Validators.required, Validators.minLength(3), 
	    	Validators.maxLength(40)]],
	    padre_id: [null,[]],
	    direccion: [null,[Validators.minLength(3), 
	    	Validators.maxLength(255)]],
	    ubigeo:[null, [RequireMatch]],
	    estado: ['1',[Validators.required,]],
	});
  	cargado: boolean = false;
  	titulo: string = 'Nuevo';
  	icon: string = 'bx bx-plus';
  	accion: string = 'REGISTRAR';
  	saving: boolean = false;
  	estados = [{codigo:'1',nombre:'Activo'},{codigo:'0',nombre:'Desactivo'}];
  	// $subject: Subject<string> = new Subject<string>();
  	dfiscales: DistritoFiscal[] = [];
  	testablecimientos: TipoEstablecimiento[] = [];
  	ubigeos: Ubigeo[] = [];
  	constructor(
  		private estaService: EstablecimientoService,
  		private dfiService: DistritoFiscalService,
  		private testService: TipoEstablecimientoService,
  		private ubiService: UbigeoService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		this.getDfiscales();
  		this.getTestablecimientos();
  		// this.getUbigeos();
  		if(this.data?.id){
  			this.icon = 'bx bx-edit-alt';
  			this.titulo = 'Editar';
  			this.accion = 'ACTUALIZAR';
  			this.getEdit();
  		}else{
  			this.cargado = true;
  		}
    	// this.$subject.pipe(debounceTime(600)).subscribe((nombre: string) => this.getExisteDeli(nombre));
  	}

  	getEdit(){
  		this.estaService.edit(this.data.id).subscribe(
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

  	getDfiscales(){
	    var filtro: DfFiltSearch = DfFiltSearch.inicial("","","F","1");
	    // filtro.ordering = 'codigo';
	    this.dfiService.search(filtro).subscribe(
	      res=> {
	         this.dfiscales = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

	getTestablecimientos(){
	    var filtro: TestFiltSearch = TestFiltSearch.inicial("","","1");
	    filtro.ordering = 'orden';
	    this.testService.search(filtro).subscribe(
	      res=> {
	         this.testablecimientos = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

	// getUbigeos(){
	//     var filtro: UbiFiltSearch = UbiFiltSearch.inicial("10","","4028","DIST","1");
	//     filtro.ordering = 'nombre';
	//     this.ubiService.search(filtro).subscribe(
	//       res=> {
	//       	console.log("Ubigeos: ", res.resultado);
	//       },
	//       error=> {
	//         this.msgs.error(error);
	//       }
	//     );
	// }

	autoUbigeo: OperatorFunction<string, readonly Ubigeo[]> = (text$: Observable<string>) =>{
	    const debouncedText$ = text$.pipe(debounceTime(300), distinctUntilChanged());
	    const inputFocus$ = this.focus2$;
	    const inputKeyup$ = this.keyup2$;
	    
	    return merge(debouncedText$, inputFocus$, inputKeyup$).pipe(
	        debounceTime(300),
	        tap(() => this.searching = true),
	        switchMap(term => {
	         return this.getUbigeos(term);
	        }),
	        map(result => {
	        	  this.ubigeos = result.resultado;
		          return result.resultado;
		        },
		        error=>{
		        	this.ubigeos = [];
		        	this.msgs.error(error);
		        }
	        ),
	        tap(() => this.searching = false)
	    );
	}

	formatUbigeo = (x: {nombre: string}) => x.nombre;

	getUbigeos(search: string){
	    var search_ = search||'';
	    if(typeof search === 'object' && search){
	        search_ = search['nombre'];
	    }
	    var filtro: UbiFiltSearch = UbiFiltSearch.inicial("10",search_,"4028","DIST","1");
	   	filtro.ordering = 'nombre';
	    return this.ubiService.search(filtro);
	};

  	selectedItem(item) {
    	//console.log("Data: ", item.item);
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
		          text: "¿Está seguro de registrar el establecimiento?",
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
			            let estaPost: EstablecimientoPost = Object.assign({}, this.myform.value);
			            this.saving = true;
			            if(this.myform.value.ubigeo){
			            	estaPost.ubigeo_id = this.myform.value.ubigeo['id'];
			            }else{
			            	estaPost.ubigeo_id = '';
			            }
				        this.estaService.add(estaPost).subscribe(
				          res=> {
				            this.toastr.success("Establecimiento registrado correctamente","Registrado");
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
		          text: "¿Está seguro de actualizar el establecimiento?",
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
			            let estaPut: EstablecimientoPut = Object.assign({}, this.myform.value);
			            if(this.myform.value.ubigeo){
			            	estaPut.ubigeo_id = this.myform.value.ubigeo['id'];
			            }else{
			            	estaPut.ubigeo_id = '';
			            }
			            this.saving = true;
				        this.estaService.update(estaPut).subscribe(
				          res=> {
				            this.toastr.success("Establecimiento actualizado correctamente","Actualizado");
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