import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AuthService } from 'src/app/shared/config/auth.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { AppClient, DatosUsuario } from 'src/app/auth/interfaces/auth-api.interface';
import { Title,  } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  year = moment().format('YYYY');
  app: AppClient = null;
  user: DatosUsuario = null;
  errorApp: boolean = false;
  errorMsg: string = '';
  private readonly url_web = this.CONFIG.config.url_web;
  private readonly token = this.authService.getAccessToken();
  logeando: boolean = false;
  autenticated: boolean = false;
  
  constructor(
    private CONFIG: ConfigService,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router) { }

  onForgotpassword() {
    
  }

  // On Signup link click
  onSignup() {
    
  }

  ngOnInit(): void {
    this.getAppClient();
    this.autenticado();
  }

  getAppClient(){
    this.authApiService.appClient().subscribe(
      res=> {
        this.app = res;
        this.titleService.setTitle(res.siglas+' | '+res.nombre+' | MPFN');
        let favIcon: HTMLLinkElement = document.querySelector('#favIcon');
        favIcon.href = res['logo'];
      },
      error=> {
        this.errorApp = true;
        this.errorMsg = error.error;
        this.toastr.error(error.error);
      }
    );
  }

  autenticado(){
    if(this.token){
      this.authApiService.datosUsuario().subscribe(
        res=> {
           this.user = res;
           this.autenticated = true;
        },
        error=> {
          this.loginApp();
        }
      );
    }else{
      this.loginApp();
    }
  }

  loginApp(){
    // window.location.href = this.authApiService.urlLoginSso();
    this.logeando = true;
    this.authApiService.urlLogin().subscribe(
      res=> {
        window.location.href = res.url;  
      },
      error=> {
        this.logeando = false;
        this.toastr.error(error.error);
      }
    );
  }

  irApp(){
    window.location.href = this.url_web;
  }

}