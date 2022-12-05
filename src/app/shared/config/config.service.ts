import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  config = environment;
  
  constructor() {
  }

  GET_CONFIG(column: string){
    return this.config[column];
  }

  GET_VARIABLE(variable: string){
    return this.config['url_api_' + variable];
  }

  GET_URL(app: string, recurso: string) {
    return this.config['url_api_' + app] + recurso;
  }
}
