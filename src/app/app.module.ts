import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule
  ],

  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
