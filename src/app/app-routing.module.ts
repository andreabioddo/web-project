import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
import { LoginActivate } from './login-activate';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'poster', component: PosterComponent },
{ path: 'overview', component: OverviewComponent, canActivate: [LoginActivate] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
