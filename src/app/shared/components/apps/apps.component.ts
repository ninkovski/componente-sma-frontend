import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { MsgsService } from 'src/app/shared/services/msgs.service';
import { RutasAcceso } from 'src/app/auth/interfaces/auth-api.interface';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
	cargandoApps = true;
	favoritos: any = [];
	rutas: RutasAcceso = null;

  	constructor(
  		private authApiService: AuthApiService,
  		private msgs: MsgsService,
  	) { }

  	ngOnInit(): void {
  		this.getFavoritos();
  		this.getRutasAcceso();
  	}

    getFavoritos(){
   		this.cargandoApps = true;
	      var filtros = {
	        'ordering':'siglas',
	        'page_size':9
	      };
      	this.authApiService.misFavoritos(filtros).subscribe(
        	res=> {
           		this.favoritos = res['data'];
           		this.cargandoApps = false;
        	},
        	error=> {
          	this.cargandoApps = false;
        });
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
}
