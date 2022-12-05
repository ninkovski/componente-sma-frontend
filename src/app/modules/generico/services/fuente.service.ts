import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuenteInfoResp } from '../interfaces/fuente.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class FuenteService {
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(categoria: String) {
    let url = this.CONFIG.GET_URL('sgtm', 'generico/fuentes/search');
    let params = this.transf.params({'categoria':categoria});
    return this.http.get<FuenteInfoResp>(url+params);
  }

}