import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent, // Dichiara HeaderComponent
    FooterComponent, // Dichiara FooterComponent
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent, // Esporta HeaderComponent
    FooterComponent, // Esporta FooterComponent
  ],
})
export class SharedModule {}
