import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

const API_URL = 'http://api.graphql.tk/authors';
const EVERYTHING_URL = 'http://localhost:3000/everything';

@Injectable()
export class Data {
  static API_URL: string = 'http://api.graphql.tk/authors';
  static EVERYTHING_URL: string = 'http://localhost:3000/everything';

  constructor(
    private http: Http,
    private apollo: Angular2Apollo
  ) {}

  fetchV1(): Promise<any> {
    let data;

    // get authors
    return this._getAuthors()
      .then((authors) => {
        // save
        data = authors;
        // get books of each author
        return Promise.all(authors.map(author => this._getBooks(author)));
      })
      .then(allBooks => {
        // assign books for each author
        allBooks.forEach((books, i) => {
          data[i].books = books;
        });

        return data;
      });
  }

  fetchV2(): Promise<any> {
    return this.http
      .get(Data.EVERYTHING_URL)
      .map(response => response.json())
      .toPromise();
  }

  fetchV3(): Promise<any> {
    return this.apollo
      .query({
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
      })
      .then(({data}) => {
        return data.authors;
      });
  }

  _getAuthors() {
    // author links
    return this.http.get(Data.API_URL)
      .map(data => data.json())
      .toPromise()
      .then(authorLinks => {
        // data of each author based on that link
        return Promise.all(
          authorLinks.map(
            authorLink => this.http
              .get(authorLink.href)
              .map(data => data.json())
              .toPromise()
          )
        );
      });
  }

  _getBooks(author) {
    // book links for an author
    return this.http.get(author.books)
      .map(data => data.json())
      .toPromise()
      .then(bookLinks => {
        // data of each book based on that link
        return Promise.all(
          bookLinks.map(
            bookLink => this.http
              .get(bookLink.href)
              .map(data => data.json())
              .toPromise()
          )
        );
      });
  }
}

export const DATA_PROVIDERS = [Data];
