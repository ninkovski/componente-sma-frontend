import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AmbienteRespList, AmbFiltSearch } from '../interfaces/ambiente.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {
  base: string = 'administracion/ambientes';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(filtros: AmbFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(filtros);
    return this.http.get<AmbienteRespList>(url+params);
  }

}