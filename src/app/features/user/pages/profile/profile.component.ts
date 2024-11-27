import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Proprietà per memorizzare il messaggio di benvenuto
  welcomeMessage: string = '';

  // Iniettare il servizio AuthService per ottenere i dettagli dell'utente
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setWelcomeMessage();
  }

  // Metodo per impostare il messaggio di benvenuto
  setWelcomeMessage(): void {
    const userName = this.authService.getUserName(); // Ottieni il nome dell'utente
    const userSurname = this.authService.getUserSurname(); // Ottieni il cognome dell'utente

    // Se il nome e cognome sono disponibili, usa entrambi per un messaggio completo
    if (userName && userSurname) {
      this.welcomeMessage = `Benvenuto ${userName} ${userSurname}!`;
    } else {
      this.welcomeMessage = 'Benvenuto nel tuo profilo!';
    }
  }
}
