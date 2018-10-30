import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StandingsComponent } from './standings/standings/standings.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AddComponent } from './add/add/add.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'add', component: AddComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
