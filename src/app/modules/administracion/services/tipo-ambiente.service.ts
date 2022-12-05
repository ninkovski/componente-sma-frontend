import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TipoAmbienteRespList, TambFiltSearch } from '../interfaces/tipo-ambiente.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAmbienteService {
  base: string = 'administracion/tipos-ambiente';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(data: TambFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(data);
    return this.http.get<TipoAmbienteRespList>(url+params);
  }

}