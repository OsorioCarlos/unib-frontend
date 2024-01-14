import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environment/environment';

import { Credencial } from '../interfaces/credencial';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) { }

  login(credencial: Credencial): Observable<AuthResponse> {
    const url = `${this.apiUrl}/login`;
    const body = credencial;

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(res => {
        if (res.estado == 'ok') {
          sessionStorage.setItem('token', res.token!);
        }
      }),
      map( res => res),
      catchError(err => of(err.error))
    );
  }

  logout(): Observable<AuthResponse> {
    const url = `${this.apiUrl}/logout`;
    const body = {};

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(res => {
        if (res.estado == 'ok') {
          sessionStorage.clear();
        }
      }),
      map( res => res),
      catchError(err => of(err.error))
    );
  }

  checkToken(): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

}
