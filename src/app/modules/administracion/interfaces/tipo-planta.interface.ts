import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';


export interface TipoPlantaRespList {
    pagination: Pagination;
    resultado:  TipoPlanta[];
}

export interface TipoPlanta {
  id: number;
  codigo: string;
  nombre: string;
  nombre_plural: string;
  abreviatura: string;
  tiene_nro: string;
  estado: string;
}

export class TplaFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public codigo:    string, // 01,02,03,04
      public estado:      string, // 1,0
      public ordering:    string){}

    static inicial(limit: string, search: string, estado: string){

      return new TplaFiltSearch(
        limit, 
        search,
        "",
        "",
        estado,
        ""
      );
    }
}