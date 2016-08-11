import angular from 'angular';

const name = 'book';

class BookComponent {}

export default angular.module(name, [])
  .component(name, {
    bindings: {
      book: '<'
    },
    template: `
      <img ng-src="{{$ctrl.book.image}}"/>
      <div>
        {{$ctrl.book.title}}
      </div>
    `,
    controller: BookComponent
  });
