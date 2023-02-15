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
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { ManagerWorkspaceComponent } from './components/manager-workspace/manager-workspace.component';
import { TheatersControlComponent } from './components/manager-workspace/managerComponents/theaters-control/theaters-control.component';
// import {MatDialogModule} from '@angular/material/dialog';
import { NavbarLayoutComponent } from './components/navbar-layout/navbar-layout.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CookieService } from 'ngx-cookie-service';
import { MovieControlComponent } from './components/manager-workspace/managerComponents/movie-control/movie-control.component';
import { SheduleControlComponent } from './components/manager-workspace/managerComponents/shedule-control/shedule-control.component';
import { TicketsControlComponent } from './components/manager-workspace/managerComponents/tickets-control/tickets-control.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PosterComponent,
    FilmIconComponent,
    OverviewComponent,
    MovieDetailComponent,
    TicketComponent,
    UserManagerComponent,
    ManagerWorkspaceComponent,
    TheatersControlComponent,
    ManagerWorkspaceComponent,
    MovieControlComponent,
    SheduleControlComponent,
    TicketsControlComponent,
    NavbarLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgxQRCodeModule
  ],
  providers: [GlobalService, LoginActivate, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
