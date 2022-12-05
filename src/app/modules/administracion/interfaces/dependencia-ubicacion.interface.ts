import { Result } from 'src/app/shared/interfaces/result.interface';
import { Pagination } from 'src/app/shared/interfaces/pagination.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { EstablecimientoEdit } from './establecimiento.interface';

export interface DependenciaUbicacionPagination {
    pagination: Pagination;
    resultado:  DependenciaUbicacion[];
}

export interface DependenciaUbicacion {
  id: number;
  codigo: string;
  nombre: string;
  abreviatura: string;
  ubicaciones: number;
  distrito_fiscal_nombre: string;
  ubigeo_nombre: string;
  estado: string;
}

export interface DependenciaUbicacionEdit {
  id: number;
  distrito_fiscal_id: number;
  distrito_fiscal_nombre: string;
  establecimiento: EstablecimientoEdit;
  planta_id: number;
  planta_nombre: string;
  ambiente_id: number;
  tipo_ambiente_nombre: string;
  ambiente_numero: string;
  ambiente_nombre: string;
  orden: number;
  estado: string;
}

export interface DependenciaUbicacionEditResp {
    resultado: DependenciaUbicacionEdit[];
}


export interface DependenciaUbicacionPost {
  id: number;
  establecimiento_id: number;
  planta_id: number;
  ambiente_id: number;
  orden: number;
  estado: string;
}

export interface DependenciaUbicacionRequest {
    dependencia_id:  string;
    ubicaciones: DependenciaUbicacionPost[];
    ids_delete: number[];
}

export interface DependenciaUbicacionRequestResp {
    resultado:  DependenciaUbicacionRequest;
}