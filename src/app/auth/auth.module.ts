import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NextComponent } from './pages/next/next.component';


@NgModule({
  declarations: [
    HomeComponent, 
    NextComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
