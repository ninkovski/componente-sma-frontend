import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { LoadingIniComponent } from './loading-ini/loading-ini.component';
import { LoagingMsgComponent } from './loaging-msg/loaging-msg.component';

@NgModule({
  declarations: [
    OrderComponent, 
    PaginationComponent,
    LoadingComponent, 
    LoadingIniComponent,
    LoagingMsgComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
  	OrderComponent,
  	PaginationComponent,
  	LoadingComponent,
    LoadingIniComponent,
    LoagingMsgComponent
  ],
})
export class ComponentsModule { }
