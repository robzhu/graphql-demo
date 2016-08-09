import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs';

import './styles.css';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { defaultApolloClient, APOLLO_PROVIDERS } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { DATA_PROVIDERS } from './shared/data.service';

import client from './client';

bootstrap(AppComponent, [
  defaultApolloClient(client),
  APOLLO_PROVIDERS,
  HTTP_PROVIDERS,
  DATA_PROVIDERS
]);
