import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'push-based-app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  pageSizeOption: Number[];

  @Output() pageSize = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  changePageSize(pageSize: string) {
    this.pageSize.emit(+pageSize);
  }
}
