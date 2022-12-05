import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mpfn-loading-ini',
  templateUrl: './loading-ini.component.html',
  styleUrls: ['./loading-ini.component.scss']
})
export class LoadingIniComponent implements OnInit {

  @Input() loading: boolean;
  @Input() msg: string;
  constructor() { }

  ngOnInit(): void {
  }

}
