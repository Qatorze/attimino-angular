import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from '../../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { RandomCardComponent } from './components/random-card/random-card.component';

@NgModule({
  declarations: [HomepageComponent, MainComponent, OverviewComponent, RandomCardComponent],
  imports: [CommonModule, HomepageRoutingModule, SharedModule], // Importe SharedModule afin de pouvoir utiliser l'header e le footer
})
export class HomepageModule {}
