import angular from 'angular';
import asyncFilter from 'angular-async-filter';

import client from './client';
import AuthorComponent from './app/author.component';
import DataService from './shared/data.service';
import ApolloProvider from './shared/apollo.provider';

class AppComponent {
  constructor(data) {
    this.data = data;
  }

  $onInit() {
    this.authors = this.fetch(1);
  }

  fetch(type) {
    return this.data[`fetchV${type}`]();
  }
}

AppComponent.$inject = ['data'];

const name = 'app';

export default angular.module(name, [
  AuthorComponent.name,
  DataService.name,
  ApolloProvider.name,
  asyncFilter
])
  .component(name, {
    template: `
      <author ng-repeat="author in $ctrl.authors | async" author="author"></author>
    `,
    controller: AppComponent
  })
  .config(['apolloProvider', (apolloProvider) => {
    apolloProvider.defaultClient(client);
  }])
