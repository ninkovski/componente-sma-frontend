import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';

export class Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN = this.CONFIG.config.var_token;
  private readonly REFRESH_TOKEN = this.CONFIG.config.var_refresh;
  private readonly client_app = this.CONFIG.config.client_app;
  private loggedUser: string;
  
  constructor(private http: HttpClient,
      private CONFIG: ConfigService,
      private authApiService: AuthApiService,
      ) {}

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  refreshToken() {
    let url_refresh = this.authApiService.urlRefresh();
    return this.http.post<any>(url_refresh, {
      'refresh_token': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.access_token);
    }));
  }

  getAccessToken() {
    return localStorage.getItem(this.TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    localStorage.removeItem("path_current_"+this.client_app);
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(access_token: string) {
    localStorage.setItem(this.TOKEN, access_token);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.TOKEN, tokens.refresh_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}