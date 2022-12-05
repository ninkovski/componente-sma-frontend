import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';


export interface EstablecimientoPagination {
    pagination: Pagination;
    resultado:  Establecimiento[];
}

export interface Establecimiento {
  id: number;
  codigo: string;
  distrito_fiscal_nombre: string;
  tipo_establecimiento_nombre: string;
  nombre: string;
  abreviatura: string;
  direccion: string;
  ubigeo_nombre: string;
  plantas: number;
  estado: string;
}

export interface EstablecimientoPost {
  distrito_fiscal_id: number;
  tipo_establecimiento_id: number;
  nombre: string;
  abreviatura: string;
  padre_id: number;
  direccion: number;
  ubigeo_id: string;
  estado: string;
}

export interface EstablecimientoResp {
    resultado:  Establecimiento;
}

export interface EstablecimientoPut {
  id: number;
  distrito_fiscal_id: number;
  tipo_establecimiento_id: number;
  nombre: string;
  abreviatura: string;
  direccion: number;
  ubigeo_id: string;
}

export interface EstablecimientoEdit {
  id: number;
  tipo_establecimiento_nombre: string;
  nombre: string;
  direccion: string;
  ubigeo_nombre: string;
}


export interface EstablecimientoRespList {
    resultado:  Establecimiento[];
}

export class EstaFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public distrito_fiscal_id:      string,
      public tipo_establecimiento_id:      string,
      public codigo:    string,
      public estado:      string,
      public ordering:    string){}

    static inicial(limit: string, search: string, distrito_fiscal_id: string,
      estado: string){

      return new EstaFiltSearch(
        limit, 
        search,
        "",
        distrito_fiscal_id,
        "",
        "",
        estado,
        ""
      );
    }
}