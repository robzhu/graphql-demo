import angular from 'angular';
import gql from 'graphql-tag';

import ApolloProvider from './apollo.provider';

const API_URL = 'http://api.graphql.tk/authors';
const EVERYTHING_URL = 'http://localhost:3000/everything';

class DataService {
  constructor($q, $http, apollo) {
    this.$q = $q;
    this.http = $http;
    this.apollo = apollo;
  }

  fetchV1() {
    let data;

    // get authors
    return this._getAuthors()
      .then((authors) => {
        // save
        data = authors;
        // get books of each author
        return this.$q.all(authors.map(author => this._getBooks(author)));
      })
      .then(allBooks => {
        // assign books for each author
        allBooks.forEach((books, i) => {
          data[i].books = books;
        });

        return data;
      });
  }

  fetchV2() {
    return this.http.get(EVERYTHING_URL).then(result => result.data);
  }

  fetchV3() {
    return this.apollo.query({
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
    }).then(result => result.data.authors);
  }

  _getAuthors() {
    // author links
    return this.http.get(API_URL)
      .then(result => result.data)
      .then(authorLinks => {
        // data of each author based on that link
        return this.$q.all(
          authorLinks.map(
            authorLink => this.http
              .get(authorLink.href)
              .then(result => result.data)
          )
        );
      });
  }

  _getBooks(author) {
    // book links for an author
    return this.http.get(author.books)
      .then(result => result.data)
      .then(bookLinks => {
        // data of each book based on that link
        return this.$q.all(
          bookLinks.map(
            bookLink => this.http
              .get(bookLink.href)
              .then(result => result.data)
          )
        );
      });
  }
}

DataService.$inject = ['$q', '$http', 'apollo'];

export default angular.module('data', [
  ApolloProvider.name
])
  .service('data', DataService);
