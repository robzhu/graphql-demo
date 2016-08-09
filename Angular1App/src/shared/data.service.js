import angular from 'angular';
import gql from 'graphql-tag';

import ApolloProvider from './apollo.provider';

const API_URL = 'http://api.graphql.tk/authors';
const EVERYTHING_URL = 'http://localhost:3000/everything';

class DataService {
  constructor($http, apollo) {
    this.http = $http;
    this.apollo = apollo;
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
}

DataService.$inject = ['$http', 'apollo'];

export default angular.module('data', [
  ApolloProvider.name
])
  .service('data', DataService);
