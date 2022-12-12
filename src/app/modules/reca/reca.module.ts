import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaRoutingModule } from './reca-routing.module';
import { RecaListComponent } from './pages/reca-list/reca-list.component';
import { RecaRegisterComponent } from './pages/reca-register/reca-register.component';

@NgModule({
  declarations: [
    RecaListComponent,
    RecaRegisterComponent
  ],
  imports: [
    CommonModule,
    RecaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class RecaModule { }
