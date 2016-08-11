import angular from 'angular';

import BookComponent from './book.component';

const name = 'author';

class AuthorComponent {}

export default angular.module(name, [
  BookComponent.name
])
  .component(name, {
    bindings: {
      author: '<'
    },
    template: `
      <img ng-src="{{$ctrl.author.image}}">
      <div>
        <h2>{{$ctrl.author.name}}</h2>
      </div>
      <div class="books">
        <book ng-repeat="book in $ctrl.author.books" book="book"></book>
      </div>
    `,
    controller: AuthorComponent
  });
