import { Component, OnInit } from '@angular/core';
import { Estadisticas } from '../../generico/interfaces/estadisticas.interface';
import { EstadisticasService } from '../../generico/services/estadisticas.service';
import { ToastrService } from 'ngx-toastr';
import { MsgsService } from 'src/app/shared/services/msgs.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {


  estadisticas: Estadisticas = null;
  cargado: boolean = false;
  constructor(
  	private estaService: EstadisticasService,
  	private toastr: ToastrService,
  	private msgs: MsgsService,
  	) { }

  ngOnInit(): void {
  	this.getEstadisticas();
  }

  getEstadisticas(){
    this.cargado = false;
    this.estaService.totales().subscribe(
      res=> {
         this.estadisticas = res.resultado;
         this.cargado = true;
      },
      error=> {
        this.msgs.error(error);
        this.cargado = true;
      }
    );
  }

}
