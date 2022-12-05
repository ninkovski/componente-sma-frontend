import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';


export interface TipoEstablecimientoPagination {
    pagination: Pagination;
    resultado:  TipoEstablecimiento[];
}

export interface TipoEstablecimiento {
  id: number;
  codigo: string;
  nombre: string;
  nombre_plural: string;
  abreviatura: string;
  orden: number;
  estado: string;
}

export interface TipoEstablecimientoPost {
  nombre: string;
  nombre_plural: string;
  abreviatura: string;
  orden: number;
  estado: string;
}

export interface TipoEstablecimientoResp {
    resultado:  TipoEstablecimiento;
}

export interface TipoEstablecimientoPut {
  id: number;
  nombre: string;
  nombre_plural: string;
  abreviatura: string;
  orden: number;
  estado: string;
}


export interface TipoEstablecimientoRespList {
    resultado:  TipoEstablecimiento[];
}

export class TestFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public codigo:    string, // 001,002
      public estado:      string, // 1,0
      public ordering?:    string){}

    static inicial(limit: string, search: string, estado: string){

      return new TestFiltSearch(
        limit, 
        search,
        "",
        "",
        estado,
        ""
      );
    }
}