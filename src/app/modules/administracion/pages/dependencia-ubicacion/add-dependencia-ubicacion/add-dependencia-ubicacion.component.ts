import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map,
	switchMap, tap, finalize, startWith } from 'rxjs/operators';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { DistritoFiscal, DfFiltSearch } from '../../../../maestras/interfaces/distrito-fiscal.interface';
import { DistritoFiscalService } from '../../../../maestras/services/distrito-fiscal.service';
import { Establecimiento, EstaFiltSearch } from '../../../interfaces/establecimiento.interface';
import { EstablecimientoService } from '../../../services/establecimiento.service';

import { Planta, PlaFiltSearch } from '../../../interfaces/planta.interface';
import { PlantaService } from '../../../services/planta.service';

import { Ambiente, AmbFiltSearch } from '../../../interfaces/ambiente.interface';
import { AmbienteService } from '../../../services/ambiente.service';

import { RequireMatch } from '../../../../../shared/services/validates';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-dependencia-ubicacion',
  templateUrl: './add-dependencia-ubicacion.component.html',
  styleUrls: ['./add-dependencia-ubicacion.component.scss']
})
export class AddDependenciaUbicacionComponent implements OnInit {

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
	    distrito_fiscal_id: ['T',[]],
	    establecimiento:[null, [RequireMatch, Validators.required]],
	    planta_id: [null, []],
	    planta_nombre: [null, []],
	    ambiente_id: [null, []],
	    tipo_ambiente_nombre:[null, []],
	    ambiente_numero:[null, []],
	    ambiente_nombre:[null, []],
	    orden:[1,[]],
	    estado:[1,[]]
	});
  	cargado: boolean = false;
  	titulo: string = 'Agregar';
  	icon: string = 'bx bx-plus';
  	accion: string = 'ACEPTAR';
  	saving: boolean = false;
  	// $subject: Subject<string> = new Subject<string>();
  	dfiscales: DistritoFiscal[] = [];
  	establecimientos: Establecimiento[] = [];
  	plantas: Planta[] = [];
  	ambientes: Ambiente[] = [];

  	constructor(
  		private dfiService: DistritoFiscalService,
  		private estaService: EstablecimientoService,
  		private plaService: PlantaService,
  		private ambService: AmbienteService,
  		public activeModal: NgbActiveModal,
    	private formBuilder: FormBuilder,
    	private modalService: NgbModal,
    	private utils: UtilsService,
    	private msgs: MsgsService,
    	private toastr: ToastrService,
    ) { }

  	ngOnInit(): void {
  		this.getDfiscales();
  		// this.getEstablecimientos();
  		if(this.data){
  			this.icon = 'bx bx-edit-alt';
  			this.titulo = 'Editar';
  			this.myform.patchValue(this.data);
  			this.getPlantas(this.data['establecimiento']['id']);
  			if(this.data['planta_id']){
  				this.getAmbientes(this.data['planta_id']);
  			}
  			this.cargado = true;
  		}else{
  			this.cargado = true;
  		}
    	// this.$subject.pipe(debounceTime(600)).subscribe((nombre: string) => this.getExisteDeli(nombre));
  	}

  	cancel() {
  		this.activeModal.dismiss(null);
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

	changeDfiscal(valor){
		var id_ = valor.target.value;
		if(id_ != 'T'){
			this.myform.get("establecimiento").setValue(null);
		}
	}

	autoEstablecimiento: OperatorFunction<string, readonly Establecimiento[]> = (text$: Observable<string>) =>{
	    const debouncedText$ = text$.pipe(debounceTime(300), distinctUntilChanged());
	    const inputFocus$ = this.focus2$;
	    const inputKeyup$ = this.keyup2$;
	    
	    return merge(debouncedText$, inputFocus$, inputKeyup$).pipe(
	        debounceTime(500),
	        tap(() => this.searching = true),
	        switchMap(term => {
	         return this.getEstablecimientos(term);
	        }),
	        map(result => {
	        	  this.establecimientos = result.resultado;
		          return result.resultado;
		        },
		        error=>{
		        	this.establecimientos = [];
		        	this.msgs.error(error);
		        }
	        ),
	        tap(() => this.searching = false)
	    );
	}

	formatEstablecimiento = (x: {nombre: string}) => x.nombre;

	getEstablecimientos(search: string){
	    var search_ = search||'';
	    if(typeof search === 'object' && search){
	        search_ = search['nombre'];
	    }
	    var dfis_id = this.myform.value.distrito_fiscal_id;
	    if(dfis_id == 'T'){
	    	dfis_id = "";
	    }
	    var filtro: EstaFiltSearch = EstaFiltSearch.inicial("10",search_,dfis_id,"1");
	   	filtro.ordering = 'nombre';
	    return this.estaService.search(filtro);
	};

  	selectedEstab(item) {
    	this.myform.get("planta_id").setValue(null);
    	this.myform.get("planta_nombre").setValue(null);

    	this.myform.get("ambiente_id").setValue(null);
    	this.getPlantas(item.item.id);
    	this.ambientes = [];
  	}

  	getPlantas(estab_id){
  		this.plantas = [];
  		var filtro: PlaFiltSearch = PlaFiltSearch.inicial("","",estab_id,"1");
	    this.plaService.search(filtro).subscribe(
	      res=> {
	         this.plantas = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

	selectedPlanta(id_) {
    	this.myform.get("ambiente_id").setValue(null);
    	this.myform.get("ambiente_nombre").setValue(null);
    	this.myform.get("tipo_ambiente_nombre").setValue(null);
    	this.myform.get("ambiente_numero").setValue(null);
    	if(id_){
    		this.getAmbientes(id_);
    		this.getPlantaNombre(id_);
    	}else{
    		this.ambientes = [];
    		this.myform.get("planta_nombre").setValue(null);
    	}
    	
  	}

  	getPlantaNombre(planta_id: number){
  		var planta_nombre = "";
  		for (var i = 0; i < this.plantas.length; i++) {
	      	var planta: Planta = this.plantas[i];
	      	if(planta.id == planta_id){
	      		planta_nombre = planta.nombre;
	      		break;
	      	}
	  	}
	  	this.myform.get("planta_nombre").setValue(planta_nombre);
  	}

  	getAmbientes(planta_id){
  		this.ambientes = [];
  		var filtro: AmbFiltSearch = AmbFiltSearch.inicial("","",planta_id,"1");
  		filtro.ordering = "orden,tipo_ambiente__nombre,numero";
	    this.ambService.search(filtro).subscribe(
	      res=> {
	         this.ambientes = res.resultado;
	      },
	      error=> {
	        this.msgs.error(error);
	      }
	    );
	}

	selectedAmbiente(id_: number){
		if(id_){
			this.getAmbienteDatos(id_);
		}
	}

	getAmbienteDatos(ambiente_id: number){
  		for (var i = 0; i < this.ambientes.length; i++) {
	      	var ambiente: Ambiente = this.ambientes[i];
	      	if(ambiente.id == ambiente_id){
	      		this.myform.get("ambiente_nombre").setValue(ambiente.nombre);
	      		this.myform.get("tipo_ambiente_nombre").setValue(ambiente.tipo_ambiente_nombre);
	      		this.myform.get("ambiente_numero").setValue(ambiente.numero);
	      		break;
	      	}
	  	}
  	}

  	saveOrUpdate(){
	  	if(this.myform.valid){
	  		var res = Object.assign({}, this.myform.value);
	  		this.activeModal.close(res);

	  		// Swal.fire({
	    //       text: "¿Está seguro de aceptar la ubicación?",
	    //       icon: 'info',
	    //       iconColor:'#577c9e',
	    //       showCancelButton: true,
	    //       reverseButtons: true,
	    //       confirmButtonColor: '#264867',
	    //       cancelButtonColor: '#26486794',
	    //       confirmButtonText: 'SI, ACEPTAR',
	    //       cancelButtonText: "NO ACEPTAR",
	    //     }).then((result) => {
	    //       if (result.value) {
		   //       //    let estaPost: EstablecimientoPost = Object.assign({}, this.myform.value);
		   //       //    this.saving = true;
		   //       //    if(this.myform.value.ubigeo){
		   //       //    	estaPost.ubigeo_id = this.myform.value.ubigeo['id'];
		   //       //    }else{
		   //       //    	estaPost.ubigeo_id = '';
		   //       //    }
			  //       // this.estaService.add(estaPost).subscribe(
			  //       //   res=> {
			  //       //     this.toastr.success("Establecimiento registrado correctamente","Registrado");
			  //       //     this.activeModal.close(res);
			  //       //   },
			  //       //   error=>{
			  //       //   	this.saving = false;
			  //       //     this.msgs.error(error);
			  //       //   }
			  //       // );
			  //   }
	    //     });    
	  	}else{
	  		this.toastr.error("El formulario no es válido.");
	  	}
  	}


  
}