import angular from 'angular';

const API_URL = 'http://api.graphql.tk/authors';
const EVERYTHING_URL = 'http://localhost:3000/everything';

class DataService {
  constructor($http) {
    this.http = $http;
  }

  fetchV2() {
    return this.http.get(EVERYTHING_URL).then(result => result.data);
  }
}

DataService.$inject = ['$http'];

export default angular.module('data', [])
  .service('data', DataService);
