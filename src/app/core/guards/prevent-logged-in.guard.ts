import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const preventLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inietta il servizio di autenticazione
  const router = inject(Router); // Inietta il modulo Router per la redirezione

  // Verifica se l'utente è autenticato
  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole(); // Ottieni il ruolo dell'utente loggato

    // Evita il loop di reindirizzamento se l'utente è già nella pagina di login
    if (state.url === '/auth/login') {
      return false;
    }

    // Se l'utente è autenticato e ha un ruolo specifico
    if (userRole === 'user') {
      // Se il ruolo è 'user', lo redirigi alla pagina del feed con id e nome
      router.navigate(['/user/feed']);
    } else if (userRole === 'admin') {
      // Se il ruolo è 'admin', lo redirigi alla dashboard con id e nome
      router.navigate(['/admin/dashboard']);
    }

    // Blocca l'accesso alla route corrente (login, registrazione, etc.)
    return false;
  }

  // Se l'utente non è autenticato, permette la navigazione
  return true;
};
