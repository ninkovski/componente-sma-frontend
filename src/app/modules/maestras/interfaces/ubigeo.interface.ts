
export interface UbigeoRespList {
    resultado:  Ubigeo[];
}

export interface Ubigeo {
  id: number;
  tipo_ubigeo_nombre: string;
  codigo: string;
  nombre: string;
  capital: string;
  padre_nombre: string;
  padre_padre_nombre: string;
  cod_siga: string;
  estado: string;
}

export class UbiFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public id:    string,
      public codigo:    string,
      public pais_id:    string, 
      public pais__codigo:      string, // 4028
      public tipo_ubigeo_id:      string,
      public tipo_ubigeo__codigo:      string, // DIST
      public padre_id:    string, 
      public padre__codigo:      string,
      public estado:      string,
      public ordering:    string){}

    static inicial(limit: string, 
      search: string, 
      pais__codigo: string,
      tipo_ubigeo__codigo: string,
      estado: string){

      return new UbiFiltSearch(
        limit, 
        search,
        "",
        "",
        "",
        pais__codigo,
        "",
        tipo_ubigeo__codigo,
        "",
        "",
        estado,
        ""
      );
    }
}