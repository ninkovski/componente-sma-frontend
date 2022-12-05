import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(private http: HttpClient) {}
  data;
  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/api/aplicaciones/info_app')
      .subscribe((respuesta: any) => (this.data = respuesta));
    console.log(this.data);
  }
}
