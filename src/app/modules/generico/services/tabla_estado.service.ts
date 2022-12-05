import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TablaEstadoInfoResp } from '../interfaces/tabla_estado.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class TablaEstadoService {
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(tabla_codigo: String) {
    let url = this.CONFIG.GET_URL('sgtm', 'generico/tabla-estados/search');
    let params = this.transf.params({'tabla_codigo':tabla_codigo});
    return this.http.get<TablaEstadoInfoResp>(url+params);
  }

}