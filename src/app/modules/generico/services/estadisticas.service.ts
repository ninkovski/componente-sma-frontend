import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadisticasResp } from '../interfaces/estadisticas.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  base: string = 'generico/estadisticas';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  totales() {
    let url = this.CONFIG.GET_URL('admi', this.base+'/totales');
    return this.http.get<EstadisticasResp>(url);
  }

}