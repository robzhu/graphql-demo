import angular from 'angular';

import AppComponent from './app.component';

import './styles.css';

angular.element(document).ready(() => {
  angular.bootstrap(document.body, [
    AppComponent.name
  ]);
});
