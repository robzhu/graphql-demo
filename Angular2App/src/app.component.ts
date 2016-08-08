import { Component } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { AuthorComponent } from './app/author.component';

import gql from 'graphql-tag';

import client from './client';

@Component({
  selector: 'app',
  template: `
    <div *ngIf="!data.loading">
      <author *ngFor="let author of data.authors" [author]="author"></author>
    </div>
  `,
  directives: [AuthorComponent]
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: gql`
        query getAuthors {
          authors {
            id
            name
            image
            books {
              id
              image
              title
            }
          }
        }
      `
    }
  })
})
export class AppComponent {
  data: any;
}
