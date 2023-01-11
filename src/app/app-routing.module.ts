import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PosterComponent } from './components/poster/poster.component';
const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'poster', component: PosterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
