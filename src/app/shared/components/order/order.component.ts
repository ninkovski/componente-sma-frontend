import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mpfn-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  @Input() column: string;
  @Input() order: string;
  @Output() fOrder = new EventEmitter<string>();
  guion: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  	this.guion = this.order.includes("-");
  	this.order = this.order.replace('-','');
  }

  onOrder() {
  	this.column = '-'+this.column;
  	this.guion = true;
    this.fOrder.emit(this.column);
  }

  onOrderDesc() {
  	this.column = this.column.replace('-','');
  	this.guion = false;
    this.fOrder.emit(this.column);
  }

  onOrderNew() {
  	this.guion = false;
  	this.column = this.column.replace('-','');
    this.fOrder.emit(this.column);
  }
  
}
