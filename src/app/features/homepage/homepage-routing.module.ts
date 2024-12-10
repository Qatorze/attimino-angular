import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { MainComponent } from './pages/main/main.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'main', component: MainComponent },
      { path: 'overview', component: OverviewComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
