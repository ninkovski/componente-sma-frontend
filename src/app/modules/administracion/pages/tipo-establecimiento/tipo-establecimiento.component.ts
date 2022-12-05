import { Component, OnInit } from '@angular/core';
import { TipoEstablecimiento } from '../../interfaces/tipo-establecimiento.interface';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { TipoEstablecimientoService } from '../../services/tipo-establecimiento.service';
import { ToastrService } from 'ngx-toastr';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { DownloadService } from 'src/app/shared/services/download.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { FormTipoEstablecimientoComponent } from './form-tipo-establecimiento/form-tipo-establecimiento.component';

@Component({
  selector: 'app-tipo-establecimiento',
  templateUrl: './tipo-establecimiento.component.html',
  styleUrls: ['./tipo-establecimiento.component.scss']
})
export class TipoEstablecimientoComponent implements OnInit {

  listado: TipoEstablecimiento[] = [];
  list_page_size: number[] = [5,10,25,50,100];
  list_order = [
    {'id':'codigo','nombre':'Código', 'order':true, 'width':70},
    {'id':'nombre','nombre':'Nombre', 'order':true, 'width':null},
    {'id':'nombre_plural','nombre':'Nombre plural', 'order':true, 'width':null},
    {'id':'abreviatura','nombre':'Abreviatura', 'order':true, 'width':null},
    {'id':'orden','nombre':'Orden', 'order':true, 'width':70},
    {'id':'estado','nombre':'Estado', 'order':true, 'width':70}
  ];
  ordering = this.list_order[4]['id'];
  $subject: Subject<string> = new Subject<string>();
  page_search: PageSearch = PageSearch.inicial("",10);
  pagination: Pagination = null;
  search: string = '';
  cargado: boolean = false;
  perm = {};
  contenidos = ['tipo_establecimiento'];
  constructor(
  	private testService: TipoEstablecimientoService,
  	private toastr: ToastrService,
  	private msgs: MsgsService,
    private download: DownloadService,
    private modalService: NgbModal,
    private authApiService: AuthApiService,
  	) { }

  ngOnInit(): void {
  	const local_order = localStorage.getItem('admi_testablecimiento_order');
    const local_search = localStorage.getItem('admi_testablecimiento_search');
  
    if(local_order){
       this.ordering =  local_order;
    }else{
      localStorage.setItem('admi_testablecimiento_order', this.ordering);
    }

    if(local_search){
      this.search = local_search;
    }
    this.misPermisos();
    this.listar();
    this.$subject.pipe(debounceTime(500)).subscribe((event: string) => this.listarPor());
  }

  listar(){
    this.cargado = false;
    this.page_search.search = this.search||'';
    this.page_search.ordering = this.ordering;
    localStorage.setItem('admi_testablecimiento_search', this.page_search.search);
    
    this.testService.pagination(this.page_search).subscribe(
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
    localStorage.setItem('admi_testablecimiento_order', id);
  }

  listarTime(event: string) {

    if(event){
      this.$subject.next(event);
    }else{
      this.listarPor()
    }
  }

  actualizar(){
    this.misPermisos();
    this.listar();
  }

  exportExcel(){
    this.download.exportExcel(
      document.getElementById('myTable'),'TiposEstablecientos','DATA');
  }

  exportExcelJson(){
    this.download.exportExcelJson(
      this.listado,'TiposEstablecientos','DATA');
  }

  newEdit(data: any){
    const dialogRef = this.modalService.open(FormTipoEstablecimientoComponent, { 
      scrollable: true,
      centered: true,
      // modalDialogClass:'bg-secondary',
      // windowClass: 'bg-mpfn',
      // size: 'sm', //'sm' | 'lg' | 'xl'
      // size: 'sm',
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

