import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mpfn-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: any;
  @Input() list_page_size: any;
  @Input() max_size: any;

  @Output() pageSizeChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  	
  }

  onPageSizeChange = (pageSize) => {
    this.pageSizeChange.emit(pageSize);
  }

  onPageChange = (currentPage) => {
    this.pageChange.emit(currentPage);
  } 

}
