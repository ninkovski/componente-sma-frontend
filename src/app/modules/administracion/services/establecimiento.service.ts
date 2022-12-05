import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstablecimientoPagination, 
  EstablecimientoPost, 
  EstablecimientoResp,
  EstablecimientoPut,
  EstablecimientoRespList,
  EstaFiltSearch
} from '../interfaces/establecimiento.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  base: string = 'administracion/establecimientos';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  pagination(data: PageSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base);
    let params = this.transf.params(data);
    return this.http.get<EstablecimientoPagination>(url+params);
  }

  add(estaPost: EstablecimientoPost) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/add');
    return this.http.post<EstablecimientoResp>(url, estaPost);
  }

  edit(id: string) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/edit');
    let params = this.transf.params({'id':id});
    return this.http.get<EstablecimientoResp>(url+params);
  }

  update(estaPut: EstablecimientoPut) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/update');
    return this.http.put<EstablecimientoResp>(url, estaPut);
  }

  search(filtros: EstaFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(filtros);
    return this.http.get<EstablecimientoRespList>(url+params);
  }

}