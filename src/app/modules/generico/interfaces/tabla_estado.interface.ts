export interface TablaEstadoInfoResp {
    resultado:  TablaEstado[];
}

export interface TablaEstado {
  id: number;
  codigo: string;
  nombre: string;
}