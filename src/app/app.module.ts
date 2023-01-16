import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
import { FilmIconComponent } from './components/film-icon/film-icon.component';
import { GlobalService } from './global.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginActivate } from './login-activate';
import { OverviewComponent } from './components/overview/overview.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketComponent } from './components/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PosterComponent,
    FilmIconComponent,
    OverviewComponent,
    MovieDetailComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule
  ],
  providers: [GlobalService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
