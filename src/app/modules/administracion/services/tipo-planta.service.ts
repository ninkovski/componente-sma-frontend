import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TipoPlantaRespList, TplaFiltSearch } from '../interfaces/tipo-planta.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class TipoPlantaService {
  base: string = 'administracion/tipos-planta';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(data: TplaFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(data);
    return this.http.get<TipoPlantaRespList>(url+params);
  }

}