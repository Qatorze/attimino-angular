import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
