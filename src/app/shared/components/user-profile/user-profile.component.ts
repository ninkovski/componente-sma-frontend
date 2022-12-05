import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from 'src/app/auth/interfaces/auth-api.interface';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  user: DatosUsuario = null;

  constructor(
    private authApiService: AuthApiService,
  ) { }

  ngOnInit(): void {
    this.datosUsuario();
  }

  datosUsuario(){
    this.authApiService.datosUsuario().subscribe(
      res=> {
         this.user = res;
      },
      error=> {
        // this.cargado_user = true;
      }
    );
}

}
