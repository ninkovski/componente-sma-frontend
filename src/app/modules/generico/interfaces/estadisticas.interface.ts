export interface EstadisticasResp {
    resultado:  Estadisticas;
}

export interface Estadisticas{
	tiposestablecimiento: EstadisTipos[];
	total_testa: number;
	tiposambiente: EstadisTipos[];
	total_tamb: number;
}

export interface EstadisTipos {
  id: number;
  nombre_plural: string;
  total:  number;
}