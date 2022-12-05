import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlantaRequest, PlantaRequestResp, PlantaEditResp,
  PlaFiltSearch, PlantaRespList } from '../interfaces/planta.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  base: string = 'administracion/plantas';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  add(plaRequest: PlantaRequest) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/add');
    return this.http.post<PlantaRequestResp>(url, plaRequest);
  }

  edit(establecimiento_id: number) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/edit');
    let params = this.transf.params({'establecimiento_id':establecimiento_id});
    return this.http.get<PlantaEditResp>(url+params);
  }

  search(filtros: PlaFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(filtros);
    return this.http.get<PlantaRespList>(url+params);
  }

}