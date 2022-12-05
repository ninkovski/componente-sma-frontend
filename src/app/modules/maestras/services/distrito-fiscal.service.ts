import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DistritoFiscalRespList, DfFiltSearch } from '../interfaces/distrito-fiscal.interface';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class DistritoFiscalService {
  base: string = 'organizacion/distritosfiscal';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) { }

  search(data: DfFiltSearch = null) {
    let url = this.CONFIG.GET_URL('sgtm', this.base+'/search');
    let params = this.transf.params(data);
    return this.http.get<DistritoFiscalRespList>(url+params);
  }
}