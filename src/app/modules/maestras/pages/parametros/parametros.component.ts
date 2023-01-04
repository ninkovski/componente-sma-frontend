import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatosUsuario } from 'src/app/auth/interfaces/auth-api.interface';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss'],
})
export class ParametrosComponent implements OnInit {
  constructor(
    private authApiService: AuthApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  user: DatosUsuario = null;
  ngOnInit(): void {
    this.datos_user();
  }

  parametro = {
    id: 0,
    valor: 0,
    usuarioModificacion: '',
    fechamodificacion: '',
  };

  datos_user() {
    this.authApiService.datosUsuario().subscribe(
      (res) => {
        this.user = res;
        this.parametro.usuarioModificacion = this.user.usuario;
      },
      (error) => {}
    );
  }
  guardarParametro() {
    console.log(this.parametro);
    if (this.validate()) {
      this.http
        .put('http://localhost:8082/api-integrador/parametros', this.parametro)
        .subscribe((response: any) => {
          if (response.metadata.status == 200) {
            this.toastr.success(response.metadata.message, 'Registro exitoso!');
          } else {
            this.toastr.error('Error', response.metadata.message);
          }
        });
    }
  }
  validate() {
    if (this.parametro.id == 0) {
      this.toastr.info('Seleccione parametro.', 'Alerta');

      return false;
    }
    if (this.parametro.valor == 0) {
      this.toastr.info('Seleccione valor.', 'Alerta');
      return false;
    }
    return true;
  }
}
