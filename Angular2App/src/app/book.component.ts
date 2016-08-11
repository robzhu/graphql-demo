import { Component, Input } from '@angular/core';

@Component({
  selector: 'book',
  template: `
    <img [src]="book.image"/>
    <div>
      {{book.title}}
    </div>
  `
})
export class BookComponent {
  @Input() book: any;
}
