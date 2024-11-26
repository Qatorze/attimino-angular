import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedComponent } from './pages/feed/feed.component';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserComponent, ProfileComponent, FeedComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    SharedModule, // Importe SharedModule afin de pouvoir utiliser l'header e le footer
  ],
})
export class UserModule {}
