export interface RespuestaAlertas {
  id?: number;
  idAlerta: number;
  juridiccion?: string;
  dependenciaMPub?: string;
  dependenciaPol?: string;
  caso?: string;
  fechaIngreso?: string;
  nombreAgraviado?: string;
  nombreImputado?: string;
  sexo?: string;
  idEstado: number;
}
