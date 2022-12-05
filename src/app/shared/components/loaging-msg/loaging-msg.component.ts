import { Component, OnInit, Input, 
	Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mpfn-loaging-msg',
  templateUrl: './loaging-msg.component.html',
  styleUrls: ['./loaging-msg.component.scss']
})
export class LoagingMsgComponent implements OnInit {

  @Input() loading: boolean;
  @Input() msg: string;
 
  constructor() { }

  ngOnInit(): void {
  	
  }

}
