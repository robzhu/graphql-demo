import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs';
import './styles.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { AuthorComponent } from './app/author.component';
import { BookComponent } from './app/book.component';
import { DATA_PROVIDERS } from './shared/data.service';

import client from './client';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ApolloModule.withClient(client)
  ],
  providers: [
    ...DATA_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);