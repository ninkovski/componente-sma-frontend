
export interface DistritoFiscalRespList {
    resultado:  DistritoFiscal[];
}

export interface DistritoFiscal {
  id: number;
  codigo: string;
  nombre: string;
  abreviatura: string;
  tipo_sistema_nombre: string;
  estado: string;
}

export class DfFiltSearch {
  
    constructor(
      public limit: string,
      public search:    string,
      public codigo:    string,
      public tipo_sistema_id:    string, // 1, 2, 3
      public tipo_sistema__codigo:      string, // A,F,M
      public estado?:      string,
      public ordering?:    string){}

    static inicial(limit: string, search: string, tipo_sistema__codigo: string,
      estado: string){

      return new DfFiltSearch(
        limit, 
        search,
        "",
        "",
        tipo_sistema__codigo,
        estado,
        ""
      );
    }
}