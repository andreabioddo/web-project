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
<<<<<<< HEAD
import { ManagerWorkspaceComponent } from './components/manager-workspace/manager-workspace.component';
import { TheatersControlComponent } from './components/manager-workspace/managerComponents/theaters-control/theaters-control.component';
// import {MatDialogModule} from '@angular/material/dialog';
=======
import { NavbarLayoutComponent } from './components/navbar-layout/navbar-layout.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

>>>>>>> 56a02ab48e9c89dda0611056cc44ce6deaa4379d
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
<<<<<<< HEAD
    ManagerWorkspaceComponent,
    TheatersControlComponent
=======
    NavbarLayoutComponent
>>>>>>> 56a02ab48e9c89dda0611056cc44ce6deaa4379d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
<<<<<<< HEAD
=======
    NgxQRCodeModule
>>>>>>> 56a02ab48e9c89dda0611056cc44ce6deaa4379d
  ],
  providers: [GlobalService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
