import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SidebarService } from "./sidebar.service";
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { AuthService } from 'src/app/shared/config/auth.service';
import { MenuJerarquico, AppInfo} from 'src/app/auth/interfaces/auth-api.interface';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/config/config.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    // public menuItems: any[];
    loading: boolean = true;
    cargado_app = false;
    cargado_menu = false;
    zIndex: string = '';
    app: AppInfo = null;
    public menus: MenuJerarquico[] = [];
  
    constructor(
        public sidebarservice: SidebarService,
        private router: Router,
        private CONFIG: ConfigService,
        private toastr: ToastrService,
        private authApiService: AuthApiService,
        public authService: AuthService,
        private msgs: MsgsService,
        private titleService:Title
        ) {
        router.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                // Show loading indicator
            }

            if (event instanceof NavigationEnd && $(window).width() < 1025 && ( document.readyState == 'complete' || false ) ) {
                this.toggleSidebar();
                // Hide loading indicator
            }

            if (event instanceof NavigationError) {
                console.log(event.error);
            }
        });

    }

        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        
        if ($(".wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $(".wrapper").removeClass("nav-collapsed");
            $(".sidebar-wrapper").unbind( "hover");
        } else {
            $(".wrapper").addClass("nav-collapsed");
            $(".sidebar-wrapper").hover(
                function () {
                    $(".wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $(".wrapper").removeClass("sidebar-hovered");
                }
            )
      
        }

    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }
    

    ngOnInit() {
        this.datosApp();
        this.getMenu();
    }

    datosApp(){
        this.authApiService.appInfo().subscribe(
          res=> {
             this.app = res;
             this.cargado_app = true;
             let favIcon: HTMLLinkElement = document.querySelector('#favIcon');
             favIcon.href = res['logo'];
             this.titleService.setTitle(res['siglas']+" - "+res['nombre']);
          },
          error=> {
            this.cargado_app = true;
          }
        );
    }

    getMenu(){
        this.cargado_menu = false;
        this.authApiService.menuJerarquico().subscribe(
          res=> {
            this.menus = res;
            this.cargado_menu = true;
            $.getScript('./assets/js/app-sidebar.js');
            this.zIndex = 'zIndex999';
            this.loading = false;
          },
          error=> {
            this.cargado_menu = true;
            this.loading = false;
            this.msgs.error(error);
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

}
