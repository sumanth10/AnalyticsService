import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {PageListComponent} from './page-list/page.list.component';
import {PageDetailsComponent} from './page-details/page.details.component';
import { AppRoutingModule } from './app.routing.module';
import { httpInterceptorProviders } from './http-interceptors/index';
import { LoginService } from './services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  imports : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  declarations: [
    AppComponent,
    PageListComponent,
    PageDetailsComponent
  ],
  providers: [httpInterceptorProviders,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
