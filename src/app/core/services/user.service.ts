import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public cliente$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  private apiBaseUrl: string = 'http://localhost:8081/api/clienti';

  constructor(private http: HttpClient) {}
}
