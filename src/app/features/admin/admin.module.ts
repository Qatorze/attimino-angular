import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageExperiencesComponent } from './pages/manage-experiences/manage-experiences.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManageExperiencesComponent,
    ManageUsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
