import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
import { LoginActivate } from './login-activate';
import { OverviewComponent } from './components/overview/overview.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TicketComponent } from './components/ticket/ticket.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'poster', component: PosterComponent },
{ path: 'overview', component: OverviewComponent, /*canActivate: [LoginActivate]*/ },
{ path: 'movie/:id', component: MovieDetailComponent, /*canActivate: [LoginActivate]*/ },
{ path: 'movie/:showId/ticket/:seatId', component: TicketComponent, /*canActivate: [LoginActivate]*/ }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
