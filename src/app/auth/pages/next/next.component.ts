import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {
  private readonly TOKEN = this.CONFIG.config.var_token;
  private readonly REFRESH_TOKEN = this.CONFIG.config.var_refresh;
  private readonly url_web = this.CONFIG.config.url_web;
  private readonly client_app = this.CONFIG.config.client_app;
  private readonly con_app_name = "con_app_"+this.client_app+"_"+moment().format('YYYYMMDD');

  constructor(
  	private CONFIG: ConfigService,
  	private route: ActivatedRoute,
  	private titleService: Title,
    private router: Router
  	) {
  	}

  ngOnInit(): void {
  	this.titleService.setTitle('MPFN | auth connection');
  	this.route.queryParams
      .subscribe(params => {
        if('access_token' in params){
        	localStorage.setItem(this.TOKEN, params['access_token']);
        }
        if('refresh_token' in params){
        	localStorage.setItem(this.REFRESH_TOKEN, params['refresh_token']);
        }
      }
    );
    this.next();    
  }

  next(){
  	setTimeout(() => {
      let con_app = localStorage.getItem(this.con_app_name);
      if(!con_app){
        localStorage.removeItem(con_app);
      }
      let path_current = localStorage.getItem("path_current_"+this.client_app);
        if(path_current){
          this.router.navigateByUrl(path_current);
        }else{
          window.location.href = this.url_web;
        }
    }, 1500);
  }

}
