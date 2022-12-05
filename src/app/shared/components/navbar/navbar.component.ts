import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/config/config.service';
import { DatosUsuario} from 'src/app/auth/interfaces/auth-api.interface';
import { AuthService } from 'src/app/shared/config/auth.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    cargado_user = false;
    user: DatosUsuario = null;

    constructor(
        private authApiService: AuthApiService,
        private toastr: ToastrService,
        private CONFIG: ConfigService,
        public authService: AuthService,
        private msgs: MsgsService,
        private router: Router,
        public sidebarservice: SidebarService,
        ) { }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {
        this.datos_user();
        /* Search Bar */
        $(document).ready(function () {
            $(".mobile-search-icon").on("click", function () {
                $(".search-bar").addClass("full-search-bar")
            }), 
            $(".search-close").on("click", function () {
                $(".search-bar").removeClass("full-search-bar")
            })
        });

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
          confirmButtonColor: '#264867',
          cancelButtonColor: '#26486794',
          confirmButtonText: 'SI, CERRAR',
          cancelButtonText: "NO, CERRAR",
        }).then((result) => {
          if (result.value) {
            this.cerrarConfirm();
          }
          // else if (result.dismiss === Swal.DismissReason.cancel) {
          //   Swal.fire(
          //     'Cancelled',
          //     'Your imaginary file is safe :)',
          //     'error'
          //   )
          // }
        })
    }
}
