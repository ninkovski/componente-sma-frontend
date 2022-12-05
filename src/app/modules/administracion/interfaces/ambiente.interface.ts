import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';

export interface Ambiente {
  id: number;
  nombre: string;
  tipo_ambiente_nombre: string;
  numero: string;
  orden: number;
  estado: string;
}


export interface AmbienteRespList {
    resultado:  Ambiente[];
}

export class AmbFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public planta_id:      string,
      public tipo_ambiente_id:      string,
      public estado:      string,
      public ordering:    string){}

    static inicial(limit: string, search: string, planta_id: string,
      estado: string){

      return new AmbFiltSearch(
        limit, 
        search,
        "",
        planta_id,
        "",
        estado,
        ""
      );
    }
}

