import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoEstablecimientoPagination,
  TipoEstablecimientoRespList, TestFiltSearch, 
  TipoEstablecimientoPost, TipoEstablecimientoResp,
  TipoEstablecimientoPut } from '../interfaces/tipo-establecimiento.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class TipoEstablecimientoService {
  base: string = 'administracion/tipos-establecimiento';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  pagination(data: PageSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base);
    let params = this.transf.params(data);
    return this.http.get<TipoEstablecimientoPagination>(url+params);
  }

  search(data: TestFiltSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/search');
    let params = this.transf.params(data);
    return this.http.get<TipoEstablecimientoRespList>(url+params);
  }

  add(testPost: TipoEstablecimientoPost) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/add');
    return this.http.post<TipoEstablecimientoResp>(url, testPost);
  }

  edit(id: string) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/edit');
    let params = this.transf.params({'id':id});
    return this.http.get<TipoEstablecimientoResp>(url+params);
  }

  update(testPut: TipoEstablecimientoPut) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/update');
    return this.http.put<TipoEstablecimientoResp>(url, testPut);
  }

}