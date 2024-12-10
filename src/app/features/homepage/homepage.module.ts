import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from '../../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomepageComponent, 
    MainComponent, 
    OverviewComponent, 
    LandingPageComponent, 
  ],
  imports: [CommonModule, HomepageRoutingModule, SharedModule, FontAwesomeModule], // Importe SharedModule afin de pouvoir utiliser l'header e le footer
})
export class HomepageModule {}
