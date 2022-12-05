import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformService {
  constructor(
  ) {
  }

  private obj_to_query(obj: Object = {}) {
    const parts = {};
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        parts[key] = JSON.stringify(obj[key]);
      } else {
        parts[key] = obj[key];
      }
    }
    return parts;
  }

  params(data: Object = {}) {
    const datan = this.obj_to_query(data);
    let params: any = new URLSearchParams(datan).toString();
    if(params)
      params = "?"+params;
    return params;
  }  
}
