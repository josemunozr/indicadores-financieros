import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListIndicatorsComponent } from './components/list-indicators/list-indicators.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { DetailIndicatorComponent } from './components/detail-indicator/detail-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ListIndicatorsComponent,
    DataListComponent,
    DetailIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
