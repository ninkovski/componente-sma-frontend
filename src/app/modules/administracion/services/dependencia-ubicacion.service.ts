import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DependenciaUbicacionPagination,
  DependenciaUbicacionEditResp,
  DependenciaUbicacionRequest,
  DependenciaUbicacionRequestResp
  } from '../interfaces/dependencia-ubicacion.interface';
import { PageSearch } from 'src/app/shared/interfaces/page-search.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciaUbicacionService {
  base: string = 'administracion/dependencias-ubicacion';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  pagination(data: PageSearch = null) {
    let url = this.CONFIG.GET_URL('admi', this.base);
    let params = this.transf.params(data);
    return this.http.get<DependenciaUbicacionPagination>(url+params);
  }

  edit(dependencia_id: number) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/edit');
    let params = this.transf.params({'dependencia_id':dependencia_id});
    return this.http.get<DependenciaUbicacionEditResp>(url+params);
  }

  add(depUbiRequest: DependenciaUbicacionRequest) {
    let url = this.CONFIG.GET_URL('admi', this.base+'/add');
    return this.http.post<DependenciaUbicacionRequestResp>(url, depUbiRequest);
  }

}