import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ClickOutsideModalDirective } from './directives/click-outside-modal.directive';

@NgModule({
  declarations: [
    HeaderComponent, // Dichiara HeaderComponent
    FooterComponent, // Dichiara FooterComponent
    SearchBarComponent,
    ClickOutsideModalDirective // Cette directive me permet de fermer la barre de recherche
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
    // Exporte les composants pour les rendre disponibles dans les autres modules qui en aurons besoins
  exports: [
    HeaderComponent, // Esporta HeaderComponent
    FooterComponent, // Esporta FooterComponent
  ],
})
export class SharedModule {}
