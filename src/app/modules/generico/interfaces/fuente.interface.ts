export interface FuenteInfoResp {
    resultado:  Fuente[];
}

export interface Fuente {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}