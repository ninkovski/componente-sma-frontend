import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DefaultComponent } from './default/default.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../shared/components/components.module';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [DefaultComponent, PrincipalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    NgbModule,
  ],
})
export class DashboardModule {}
