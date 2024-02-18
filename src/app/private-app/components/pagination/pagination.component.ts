import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() total: number = 0;
  @Input() current_page: number = 0;
  @Output() changePageEvent = new EventEmitter<number>();
  public pages: number[];

  constructor() {
    this.pages = [];
  }

  ngOnChanges() {
    this.pages = [];
    for (let i = 0; i < this.total; i++) {
      this.pages.push(i + 1);
    }
  }

  public changePage(event: Event, page: number) {
    // Evitar la acción por defecto (la redirección)
    event.preventDefault();
    const temp = (page - this.current_page)
    if (temp > 0 || temp < 0) {
      this.current_page += temp;
      this.changePageEvent.emit(this.current_page);
    }
  }

}
