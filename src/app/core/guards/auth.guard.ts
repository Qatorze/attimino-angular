import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecte le service d'authentification
  const router = inject(Router); // Injecte le Module Router pour les eventuelles redirections

  const expectedRole = route.data['role']; // Obtient le role demandé depuis la route(admin ou user ecc...)
  const userRole = authService.getUserRole(); // Obtient le role du user qui fait le login

  if (authService.isAuthenticated() && userRole === expectedRole) {
    // Consent la navigation vers route demandée se le user risulte connecté et ha le role requis par la route de destination.
    return true;
  } else {
    // Bloque l'accèss à la route demandée et redirige sur la page de login si le user ne resulte pas connecté.
    router.navigate(['/auth/login']);
    return false;
  }
};
