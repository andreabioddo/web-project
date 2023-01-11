import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
import { FilmIconComponent } from './components/film-icon/film-icon.component';
import { GlobalService } from './global.servise';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PosterComponent,
    FilmIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
