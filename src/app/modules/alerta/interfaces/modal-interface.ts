import { SelectInterface } from './select-interface';

export interface dataModalInterfase {
  display: string;
  esAccion: boolean;
  alertaId: number;
  selectId: number;
  selectList: SelectInterface[];
  detalle: string;
}
