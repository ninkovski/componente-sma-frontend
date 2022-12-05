import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UbigeoRespList, UbiFiltSearch } from '../interfaces/ubigeo.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  base: string = 'ubicacion/ubigeos';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(data: UbiFiltSearch = null) {
    let url = this.CONFIG.GET_URL('sgtm', this.base+'/search');
    let params = this.transf.params(data);
    return this.http.get<UbigeoRespList>(url+params);
  }
}