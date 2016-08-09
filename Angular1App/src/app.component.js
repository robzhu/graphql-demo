import angular from 'angular';

import client from './client';
import AuthorComponent from './app/author.component';
import DataService from './shared/data.service';
import ApolloProvider from './shared/apollo.provider';

class AppComponent {
  constructor(data) {
    this.data = data;
  }

  $onInit() {
    //this.data.fetchV1().then((authors) => this.authors = authors);
    //this.data.fetchV2().then((authors) => this.authors = authors);
    this.data.fetchV3().then((authors) => this.authors = authors);
  }
}

AppComponent.$inject = ['data'];

const name = 'app';

export default angular.module(name, [
  AuthorComponent.name,
  DataService.name,
  ApolloProvider.name
])
  .component(name, {
    template: `
      <author ng-repeat="author in $ctrl.authors" author="author"></author>
    `,
    controller: AppComponent
  })
  .config(['apolloProvider', (apolloProvider) => {
    console.log('apolloProvider', apolloProvider);
    apolloProvider.defaultClient(client);
  }])
