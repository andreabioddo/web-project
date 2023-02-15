import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
import { LoginActivate } from './login-activate';
import { OverviewComponent } from './components/overview/overview.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { NavbarLayoutComponent } from './components/navbar-layout/navbar-layout.component';
import { TheatersControlComponent } from './components/manager-workspace/managerComponents/theaters-control/theaters-control.component';
import { ManagerWorkspaceComponent } from './components/manager-workspace/manager-workspace.component';
import { MovieControlComponent } from './components/manager-workspace/managerComponents/movie-control/movie-control.component';
import { SheduleControlComponent } from './components/manager-workspace/managerComponents/shedule-control/shedule-control.component';
import { TicketsControlComponent } from './components/manager-workspace/managerComponents/tickets-control/tickets-control.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'poster', component: PosterComponent },
{
  path: '',
  component: NavbarLayoutComponent,
  children: [
    { path: 'overview', component: OverviewComponent, canActivate: [LoginActivate] },
    { path: 'movie/:id', component: MovieDetailComponent, canActivate: [LoginActivate] },
    { path: 'movie/:showId/ticket/:seatId', component: TicketComponent, canActivate: [LoginActivate] },
    { path: 'manage', component: UserManagerComponent, canActivate: [LoginActivate] }]
},
{ path: 'manager', component: ManagerWorkspaceComponent,children:[
  { path: 'theaters', component: TheatersControlComponent },
  { path: 'movies', component: MovieControlComponent },
  {path:'shedule',component:SheduleControlComponent},
  {path:'tickets',component:TicketsControlComponent} 
] /*canActivate: [LoginActivate]*/ }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
