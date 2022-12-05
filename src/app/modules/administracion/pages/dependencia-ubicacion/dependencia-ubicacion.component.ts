import { Component, OnInit } from '@angular/core';
import { DependenciaUbicacion } from '../../interfaces/dependencia-ubicacion.interface';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { DependenciaUbicacionService } from '../../services/dependencia-ubicacion.service';
import { ToastrService } from 'ngx-toastr';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DistritoFiscal, DfFiltSearch } from '../../../maestras/interfaces/distrito-fiscal.interface';
import { DistritoFiscalService } from '../../../maestras/services/distrito-fiscal.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { FormDependenciaUbicacionComponent } from './form-dependencia-ubicacion/form-dependencia-ubicacion.component';

@Component({
  selector: 'app-dependencia-ubicacion',
  templateUrl: './dependencia-ubicacion.component.html',
  styleUrls: ['./dependencia-ubicacion.component.scss']
})
export class DependenciaUbicacionComponent implements OnInit {

  listado: DependenciaUbicacion[] = [];
  list_page_size: number[] = [5,10,25,50,100,500,1000,2000,5000,10000];
  list_order = [
    {'id':'distrito_fiscal__nombre','nombre':'Distrito fiscal', 'order':true, 'width':null},
	{'id':'codigo','nombre':'Código', 'order':true, 'width':70},
    {'id':'nombre','nombre':'Nombre', 'order':true, 'width':null},
    {'id':'abreviatura','nombre':'Abreviatura', 'order':true, 'width':null},
    {'id':'ubigeo__nombre','nombre':'Ubigeo', 'order':true, 'width':null},
    {'id':'ubicaciones','nombre':'Ubicaciones', 'order':false, 'width':100},
    {'id':'estado','nombre':'Estado', 'order':true, 'width':70}
  ];
  ordering = this.list_order[2]['id'];
  $subject: Subject<string> = new Subject<string>();
  page_search: PageSearch = PageSearch.inicial("",10);
  pagination: Pagination = null;
  search: string = '';
  cargado: boolean = false;
  dfiscales: DistritoFiscal[] = [];
  distrito_fiscal_id: string = 'T';
  estados = [{id:'1',nombre:'Activo'},{id:'0',nombre:'Desactivo'}];
  estado: string = '1';
  perm = {};
  contenidos = ['dependencia_ubicacion'];
  constructor(
  	private dubiService: DependenciaUbicacionService,
    private dfiService: DistritoFiscalService,
  	private authApiService: AuthApiService,
    private toastr: ToastrService,
  	private msgs: MsgsService,
    private download: DownloadService,
    private modalService: NgbModal
  	) { }

  ngOnInit(): void {
  	const local_order = localStorage.getItem('admi_dependencia_ubi_order');
    const local_search = localStorage.getItem('admi_dependencia_ubi_search');
  
    if(local_order){
       this.ordering =  local_order;
    }else{
      localStorage.setItem('admi_dependencia_ubi_order', this.ordering);
    }

    if(local_search){
      this.search = local_search;
    }
    this.listar();
    this.getDfiscales();
    this.misPermisos();
    this.$subject.pipe(debounceTime(800)).subscribe((event: string) => this.listarPor());
  }

  listar(){
    this.cargado = false;
    this.page_search.search = this.search||'';
    this.page_search.ordering = this.ordering;
    localStorage.setItem('admi_dependencia_ubi_search', this.page_search.search);
    if(this.distrito_fiscal_id !='T'){
      this.page_search['distrito_fiscal_id'] = this.distrito_fiscal_id;
    }else{
      delete this.page_search['distrito_fiscal_id'];
    }
    if(this.estado !='T'){
      this.page_search['estado'] = this.estado;
    }else{
      delete this.page_search['estado'];
    }
    this.dubiService.pagination(this.page_search).subscribe(
      res=> {
         this.listado = res.resultado;
         this.pagination = res.pagination;
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

  pageChange = (currentPage) => {
    this.page_search.current_page =  currentPage;
    this.listar();
  }

  pageSizeChange = (pageSize) => {
    this.page_search.current_page =  1;
    this.page_search.page_size =  pageSize;
    this.listar();
  }

  listarPor = function(){
    this.page_search.current_page = 1;
    this.listar();
  }

  ordenar = function(id: string){
    this.ordering = id;
    this.listarPor();
    localStorage.setItem('admi_dependencia_ubi_order', id);
  }

  listarTime(event: string) {

    if(event){
      this.$subject.next(event);
    }else{
      this.listarPor()
    }
  }

  changeDfiscal(event){
    this.listarPor();
  }

  exportExcel(){
    this.download.exportExcel(
      document.getElementById('myTable'),'DependenciasUbicacion','DATA');
  }

  exportExcelJson(){
    this.download.exportExcelJson(
      this.listado,'DependenciasUbicacion','DATA');
  }

  actualizar(){
    this.misPermisos();
    this.listar();
  }

  addUbicaciones(data: any){
    const dialogRef = this.modalService.open(FormDependenciaUbicacionComponent, { 
      scrollable: false,
      centered: true,
      // modalDialogClass:'bg-secondary',
      // windowClass: 'bg-mpfn',
      // size: 'sm', //'sm' | 'lg' | 'xl'
      size: 'xl',
      keyboard:true, // escape,
      backdrop: 'static'
      // backdrop: true
      });
    dialogRef.componentInstance.data = data;
    dialogRef.result.then((result) => {
      this.listar();
    }, (reason) => {
      
    });
  }

  misPermisos(){
    this.authApiService.misPermisos(this.contenidos).subscribe(
      res=> {
         this.perm = res;
      },
      error=> {
        this.msgs.error(error);
      }
    );
  }

}

