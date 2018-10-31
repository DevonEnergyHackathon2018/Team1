import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { StandingsComponent } from './standings/standings/standings.component';
import { RecommendationsComponent } from './recommendations/recommendations.component'
import { AddComponent } from './add/add/add.component';
import { StandingService } from './services/standings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { Browser } from 'protractor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    StandingsComponent,
    RecommendationsComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
  ],
  providers: [StandingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
