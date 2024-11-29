import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interfaces/decoded-token';
import { LoginRequest } from '../interfaces/login-request';
import { RegisterRequest } from '../interfaces/register-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string = 'http://localhost:8081/api/auth';

  // Ici "null" est la valeur par defaut que je passe à mon "BehaviorSubject" car c'est obbligé de lui passer une valeur par defaut.
  private userToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private http: HttpClient, private router: Router) {
    const token = sessionStorage.getItem('authJWToken');
    if (token) {
      this.userToken$.next(token);
      this.setToken(token); // Decodifica e imposta il token
    }

    // Imposta i dati utente decodificandoli dal token
    const user = this.getUserFromToken();
    if (user) {
      this.user$.next(user);
    }
  }

  // Questo metodo mi consente di salvare il token nella session storage dell'utente che fa l'accesso
  //Usiamo l'interfaccia DecodedToken per gestire il tipo del token

  // Metodo per salvare il token nella session storage
  public setToken(token: string): void {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      // Controlla se il ruolo è "admin" o "user"
      if (decodedToken.role === 'admin' || decodedToken.role === 'user') {
        this.userToken$.next(token); // Aggiorna il BehaviorSubject del token
        sessionStorage.setItem('authJWToken', token); // Salva il token nella sessionStorage

        // Aggiorna i dati dell'utente dal token
        const user = this.getUserFromToken();
        if (user) {
          this.user$.next(user); // Aggiorna il BehaviorSubject dell'utente
        }
      } else {
        console.warn(`Ruolo non autorizzato: ${decodedToken.role}`);
        this.logout(); // Rimuovi ogni traccia se il ruolo non è valido
      }
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      this.logout(); // In caso di token invalido, esegui il logout
    }
  }

  // Metodo per ottenere l'utente decodificando il token JWT
  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<{
        id: number;
        email: string;
        role: string;
        surname: string;
        name: string;
        imagePath: string;
      }>(token);

      return {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
        surname: decodedToken.surname || '',
        name: decodedToken.name || '',
        password: '', // Vuoto, il token non contiene la password
        imagePath: decodedToken.imagePath || '',
      };
    } catch (error) {
      console.error('Errore nella decodifica del token JWT:', error);
      return null;
    }
  }

  // Metodo per effettuare l'accesso
  public login$(
    email: string,
    password: string
  ): Observable<{ token: string }> {
    // Oggetto per la richiesta di "login" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const loginRequest: LoginRequest = { email, password };

    /** "{ withCredentials: true }" pour permettre l'envoie des cookies tra il frontend e le backend */
    return this.http
      .post<{ token: string }>(`${this.apiBaseUrl}/login`, loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          // Imposta il token e decodifica i dati
          this.setToken(response.token);
        }),
        catchError(this.handleError('login'))
      );
  }

  // Metodo per registrare un nuovo utente
  public register$(
    surname: string,
    name: string,
    email: string,
    password: string
  ): Observable<User> {
    // Oggetto per la richiesta di "registrazione" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const registerRequest: RegisterRequest = { surname, name, email, password };

    return this.http
      .post<User>(`${this.apiBaseUrl}/register`, registerRequest)
      .pipe(catchError(this.handleError('register')));
  }

  // Metodo per la gestione di errori sia per il form di "login" che per quello di "registrazione".
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Erreur durant la fase de ${operation}.`;
      if (error.status === 0) {
        errorMessage = 'Problème de connection au server.';
      } else if (error.status === 401) {
        errorMessage =
          operation === 'login'
            ? 'Credenziali non valide.'
            : "L'email inserita è già collegata ad un account.";
      }
      return throwError(() => new Error(errorMessage));
    };
  }

  // Pulisce i BehaviorSubjects "cliente$" et "clienteToken$" et la session storage
  public logout(): void {
    this.user$.next(null);
    this.userToken$.next(null);
    sessionStorage.removeItem('authJWToken');
  }

  // Verifica se l'utente è autenticato
  public isAuthenticated(): boolean {
    return !!this.userToken$.value;
  }

  /** Vari "Getters" che mi consentono di recuperare i dati salvati nella session storage */
  // Ottieni il token corrente
  public getToken(): string | null {
    return this.userToken$.value;
  }

  // Ottenere l'Id del cliente logato
  public getUserId(): number | null {
    return this.user$.value ? Number(this.user$.value.id) : null;
  }

  // Ottenere il nome del cliente logato
  public getUserSurname(): string | null | undefined {
    return this.user$.value ? this.user$.value.surname : null;
  }

  // Ottenere il nome del cliente logato
  public getUserName(): string | null | undefined {
    return this.user$.value ? this.user$.value.name : null;
  }

  // Ottenere il nome del cliente logato
  public getUserRole(): string | null | undefined {
    return this.user$.value ? this.user$.value.role : null;
  }

  // Obtenir l'email
  public getUserEmail(): string | null | undefined {
    return this.user$.value ? this.user$.value.email : null;
  }
}
