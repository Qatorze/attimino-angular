import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';

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

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.userToken$.next(token);

      // Decodifica il token JWT
      const decodedToken = jwtDecode<{
        id: number;
        email: string;
        role: string;
        surname: string;
        name: string;
        imagePath: string;
      }>(token);

      const user: User = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
        surname: decodedToken.surname || '', // Gestione nel caso in cui non sia presente
        name: decodedToken.name || '', // Gestione nel caso in cui non sia presente
        password: '', // Non è incluso nel token, quindi vuoto
        imagePath: decodedToken.imagePath || '', // Gestione nel caso in cui non sia presente
      };

      this.user$.next(user); // Aggiorna il BehaviorSubject dell'utente
    }

    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user$.next(JSON.parse(storedUser)); // Ripristina l'utente dal sessionStorage
    }
  }

  // Questo metodo mi consente di salvare il token nella session storage dell'utente che fa l'accesso
  public setToken(token: string): void {
    this.userToken$.next(token); // Aggiorna il BehaviorSubject del token
    sessionStorage.setItem('authToken', token); // Salva il token nella sessionStorage

    // Decodifica il token JWT
    const decodedToken = jwtDecode<{
      id: number;
      email: string;
      role: string;
      surname: string;
      name: string;
      imagePath: string;
    }>(token);

    // Crea un oggetto User basato sui dati del token
    const user: User = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
      surname: decodedToken.surname || '', // Gestione del campo "surname"
      name: decodedToken.name || '', // Gestione del campo "name"
      password: '', // Vuoto, il token non contiene la password
      imagePath: decodedToken.imagePath || '', // Gestione del campo "imagePath"
    };

    this.user$.next(user); // Aggiorna il BehaviorSubject dell'utente
    sessionStorage.setItem('user', JSON.stringify(user)); // Salva l'utente nella sessionStorage
  }

  // Metodo per effettuare l'accesso
  public login$(
    email: string,
    password: string
  ): Observable<{ token: string }> {
    // Oggetto per la richiesta di "login" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const loginRequest = {
      email: email,
      password: password,
    };

    /** "{ withCredentials: true }" pour permettre l'envoie des cookies tra il frontend e le backend */
    return this.http
      .post<{ token: string }>(`${this.apiBaseUrl}/login`, loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          const token = response.token;

          // Imposta il token e decodifica i dati
          this.setToken(token);
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
    const registerRequest = {
      surname: surname,
      name: name,
      email: email,
      password: password,
    };
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
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
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
