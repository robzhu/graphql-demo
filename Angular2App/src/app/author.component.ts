import { Component, Input } from '@angular/core';

@Component({
  selector: 'author',
  template: `
    <img [src]="author.image"/>
    <div>
      <h2>{{author.name}}</h2>
    </div>
    <div class="books">
      <book *ngFor="let book of author.books" [book]="book"></book>
    </div>
  `,
})
export class AuthorComponent {
  @Input() author: any;
}
