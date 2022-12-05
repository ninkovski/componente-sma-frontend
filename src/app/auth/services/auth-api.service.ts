import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/config/config.service';
import { DatosUsuario, MenuJerarquico, AppInfo, 
  SesionInfo, CategoriaApps, AppRedirect,
  AppClient, UrlLogin, RutasAcceso } from '../interfaces/auth-api.interface';
import { TransformService } from 'src/app/shared/services/transform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  client_app: string = '';
  constructor(
    private http: HttpClient,
    private CONFIG: ConfigService,
    private transf: TransformService
  ) {
    this.client_app = this.CONFIG.config.client_app;
  }

  urlLoginSso(){
    let url_sso = this.CONFIG.config.url_sso;
    let url_continuar = this.CONFIG.config.url_continuar.replace('#','___');
    let mode_auth = this.CONFIG.config.mode_auth;
    return url_sso+"?continuar="+url_continuar+"&client="+this.client_app+"&mode_auth="+mode_auth
  }

  urlLogin(client_app: string = this.client_app) {
    let url_continuar = this.CONFIG.config.url_continuar.replace('#','___');
    let url_sso = this.CONFIG.config.url_sso;
    let data = {'client': client_app,
      'continuar': url_continuar,
      'url_sso': url_sso};
    let url = this.CONFIG.GET_URL('auth', 'auth/url_login');
    return this.http.post<UrlLogin>(url, data);
  }

  appClient(client_app: string = this.client_app) {
    let data = {'client': client_app};
    let url = this.CONFIG.GET_URL('auth', 'auth/app');
    let params = this.transf.params(data);
    return this.http.get<AppClient>(url+params);
  }

  urlRefresh(){
    return this.CONFIG.GET_URL('auth', 'auth/refresh');;
  }

  appInfo(client_app: string = this.client_app) {
    let data = {'client': client_app};
    let url = this.CONFIG.GET_URL('auth', 'aplicaciones/info_app');
    let params = this.transf.params(data);
    return this.http.get<AppInfo>(url+params);
  }

  rutasAcceso() {
    let url = this.CONFIG.GET_URL('auth', 'servidores/rutas_acceso');
    return this.http.get<RutasAcceso>(url);
  }

  datosUsuario(siga: string = 'NO') {
    let data = {'siga': siga};
    let url = this.CONFIG.GET_URL('auth', 'auth/datos_usuario');
    let params = this.transf.params(data);
    return this.http.get<DatosUsuario>(url+params);
  }

  menuJerarquico(client_app: string = this.client_app) {
    let data = {'client': client_app};
    let url = this.CONFIG.GET_URL('auth', 'menus/jerarquico');
    let params = this.transf.params(data);
    return this.http.get<MenuJerarquico[]>(url+params);
  }

  signOff() {
    let url = this.CONFIG.GET_URL('auth','auth/sign_off');
    return this.http.post(url,null);
  }

  sesiones() {
    let url = this.CONFIG.GET_URL('auth','auth/sesiones');
    return this.http.get<SesionInfo[]>(url);
  }

  signOffSesion(id: number) {
    let data = {'id': id};
    let url = this.CONFIG.GET_URL('auth', 'auth/sign_off_sesion');
    return this.http.post(url,data);
  }

  categApps() {
    let url = this.CONFIG.GET_URL('auth', 'auth/apps');
    return this.http.get<CategoriaApps[]>(url);
  }

  misAplicaciones(filtros: any) {
    let params = this.transf.params(filtros);;
    let url = this.CONFIG.GET_URL('auth', 'mis-aplicaciones');
    return this.http.get<any>(url+params);
  }

  misFavoritos(filtros: any) {
    filtros['favoritos'] = 'SI';
    let params = this.transf.params(filtros);;
    let url = this.CONFIG.GET_URL('auth', 'mis-aplicaciones');
    return this.http.get<any>(url+params);
  }

  appClientDir(cuuid: string) {
    let data = {'cuuid': cuuid};
    let url = this.CONFIG.GET_URL('auth', 'auth/app_client_dir');
    return this.http.post<AppRedirect>(url,data);
  }

  misPermisos(contenidos: string[] = [], client_app: string = this.client_app) {
    let data = {'client': client_app, 'contenidos':contenidos};
    let url = this.CONFIG.GET_URL('auth', 'auth/mispermisos');
    return this.http.post<any>(url, data);
  }

  filtros(contenidos: string[] = [], client_app: string = this.client_app) {
    let data = {'client': client_app, 'contenidos':contenidos};
    let url = this.CONFIG.GET_URL('auth', 'auth/filtros');
    return this.http.post<any>(url, data);
  }

  validarPermiso(permiso: string, client_app: string = this.client_app) {
    let data = {'client': client_app, 'permiso':permiso};
    let url = this.CONFIG.GET_URL('auth', 'auth/validar_permiso');
    let params = this.transf.params(data);
    return this.http.get<any>(url+params);
  }

  conectarApp(client_app: string = this.client_app) {
    let data = {'client': client_app};
    let url = this.CONFIG.GET_URL('auth', 'auth/conectar_app');
    return this.http.post<any>(url, data);
  }

}