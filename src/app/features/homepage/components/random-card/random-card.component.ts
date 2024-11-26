import { Component } from '@angular/core';

@Component({
  selector: 'app-random-card',
  templateUrl: './random-card.component.html',
  styleUrl: './random-card.component.scss',
})
export class RandomCardComponent {
  imageUrl: string = this.getRandomImageUrl();
  description: string = this.getRandomDescription();

  // Metodo per generare una nuova card
  generateRandomCard(): void {
    this.imageUrl = this.getRandomImageUrl();
    this.description = this.getRandomDescription();
  }

  // Metodo per ottenere un'immagine casuale
  private getRandomImageUrl(): string {
    const images = [
      'https://picsum.photos/300/200?random=1',
      'https://picsum.photos/300/200?random=2',
      'https://picsum.photos/300/200?random=3',
      'https://picsum.photos/300/200?random=4',
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  // Metodo per ottenere una descrizione casuale
  private getRandomDescription(): string {
    const descriptions = [
      'Una splendida vista di montagna.',
      'Un tramonto mozzafiato.',
      'Una spiaggia serena e tranquilla.',
      'Una foresta incantevole.',
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}
