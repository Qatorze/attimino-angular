import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageExperiencesComponent } from './pages/manage-experiences/manage-experiences.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'manage-experiences',
        component: ManageExperiencesComponent,
      },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
