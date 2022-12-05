import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/config/config.service';
import { DatosUsuario, RutasAcceso } from 'src/app/auth/interfaces/auth-api.interface';
import { AuthService } from 'src/app/shared/config/auth.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  cargado_user = false;
  user: DatosUsuario = null;
  rutas: RutasAcceso = null;

  private readonly client_app = this.CONFIG.config.client_app;
  private readonly con_app_name = "con_app_"+this.client_app+"_"+moment().format('YYYYMMDD');

	  constructor(
	  	private authApiService: AuthApiService,
	    private toastr: ToastrService,
	    private CONFIG: ConfigService,
	    public authService: AuthService,
	    private msgs: MsgsService,
	    private router: Router,
	) { }

  	ngOnInit(): void {
  		this.datos_user();
      this.conectar_app();
      this.getRutasAcceso();
  	}

  	irRouter(router: string){
        this.router.navigateByUrl(router);
    }

    datos_user(){
        this.cargado_user = false;
        this.authApiService.datosUsuario().subscribe(
          res=> {
             this.user = res;
             this.cargado_user = true;
          },
          error=> {
          }
        );
    }

    getRutasAcceso(){
        this.authApiService.rutasAcceso().subscribe(
          res=> {
            this.rutas = res;
          },
          error=> {
          }
        );
    }

    cerrarConfirm(){
        var url = this.CONFIG.config.url_start;
        this.authApiService.signOff().subscribe(
          res=> {
            this.toastr.info('Sesión cerrada, vuelva pronto');
            this.authService.doLogoutUser();
            window.location.href = url;
          },
          error=> {}
        );
    }

    cerrarSesion(){
        Swal.fire({
          title: 'Cerrar sesión',
          text: "¿Está seguro de cerrar su sesión en el sistema?",
          icon: 'info',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#264867',
          cancelButtonColor: '#26486794',
          confirmButtonText: 'SI, CERRAR',
          cancelButtonText: "NO, CERRAR",
        }).then((result) => {
          if (result.value) {
            this.cerrarConfirm();
          }
        })
    }

    conectar_app(){
    let con_app = localStorage.getItem(this.con_app_name);
    if(!con_app){
      this.authApiService.conectarApp().subscribe(
        res=> {
          localStorage.setItem(this.con_app_name, "CONNECTED");
        },
        error=> {
          // this.msgs.error(error);
        }
      );
    }
  }
}