import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';


export interface PlantaPagination {
    pagination: Pagination;
    resultado:  Planta[];
}

export interface Planta {
  id: number;
  codigo: string;
  nombre: string;
  nombre_plural: string;
  abreviatura: string;
  orden: number;
  estado: string;
}

export interface PlantaPost {
  id: number;
  tipo_planta_id: number;
  tipo_planta_nombre: string;
  numero: number;
  color: string;
  tiene_salida: string;
  orden: number;
  estado: string;
}

export interface PlantaRequest {
    establecimiento_id:  string;
    plantas: PlantaPost[];
}

export interface PlantaRequestResp {
    resultado:  PlantaRequest;
}

export interface PlantaEditResp {
    resultado: PlantaPost[];
}


export interface PlantaRespList {
    resultado:  Planta[];
}

export class PlaFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public establecimiento_id:      string,
      public tipo_planta_id:      string,
      public estado:      string,
      public ordering:    string){}

    static inicial(limit: string, search: string, establecimiento_id: string,
      estado: string){

      return new PlaFiltSearch(
        limit, 
        search,
        "",
        establecimiento_id,
        "",
        estado,
        ""
      );
    }
}

