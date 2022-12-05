import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dura_sesion: string = this.CONFIG.GET_CONFIG('dura_sesion');
  path_start: string = this.CONFIG.GET_CONFIG('path_start');
  private readonly client_app = this.CONFIG.config.client_app;
  private readonly REFRESH_TOKEN = this.CONFIG.config.var_refresh;
  private readonly TOKEN = this.CONFIG.config.var_token;
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private CONFIG: ConfigService,
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var finsesion = moment().add(this.dura_sesion, 'minutes').format('MM/DD/YYYY HH:mm:ss');
    localStorage.setItem('finsesion', finsesion);
    let token = this.authService.getAccessToken();
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status == 401 && error.error.codigo == 'E001') {
        return this.handle401Error(request, next);
      } else {
        // Se Obtiene la ruta path cuando hay error excluyendo auth
        let path_current = this.router.url;
        if(!path_current.includes("/auth")){
          console.log("path_current: "+path_current);
          localStorage.setItem("path_current_"+this.client_app, path_current);
        }
        // Problemas con 401 - No autenticado (Autorización)
        if(error.status == 401 && typeof error['error'] == 'object'){
          var err_ = error['error'];
          if('codigo' in err_ && err_['codigo'] == "E010"){
              var refresh_ = localStorage.getItem(this.REFRESH_TOKEN);
              if(refresh_){
                localStorage.removeItem(this.REFRESH_TOKEN);
                this.toastr.error(err_['mensaje'], err_['codigo']);
              }
              this.isRefreshing = false;
              this.router.navigateByUrl(this.path_start);
          }
        }
        // Problemas 403 no autorizado - No pudo renovar
        if(error.status == 403){
          // this.isRefreshing = false;
          // this.router.navigateByUrl(this.path_start);
        }
        // Problemas 500
        if(error.status == 500){
          var url = error.url;
          var is_refresh = url.indexOf("auth/refresh");
          if(is_refresh >= 0){
            // No se pudo refrescar token
            this.toastr.warning("Hay problemas con el API de renovación de token", error.statusText);
            this.isRefreshing = false;
            this.router.navigateByUrl(this.path_start);
          }
        }
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    let token = this.authService.getAccessToken();
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request, token.access_token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(access_token => {
          return next.handle(this.addToken(request, access_token));
        }));
    }
  }
}