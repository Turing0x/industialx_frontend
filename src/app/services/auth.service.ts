import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Environments } from '../environment/env';
import { User } from '../interface/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private platform = inject(PLATFORM_ID);

  private readonly baseUrl = `${Environments.baseUrl}/auth`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public isLoggedIn = signal<boolean>(false);
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.isLoggedIn.set(false);
        return false;
      }

      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const isValid = tokenPayload.exp * 1000 > Date.now();

        this.isLoggedIn.set(isValid);
        return isValid;
      } catch (error) {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
        return false;
      }
    }

    return false;
  }

  register(registerData: User): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/register`, registerData, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response) => {
          if (isPlatformBrowser(this.platform)) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError((error) => {
          Swal.fire(
            'Registration Failed',
            error.error?.message || 'An error occurred during registration',
            'error'
          );
          return throwError(() => error);
        })
      );
  }

  private handleAuthResponse(errorTitle: string) {
    return {
      success: (response: any) => {
        if (isPlatformBrowser(this.platform)) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      error: (error: any) => {
        Swal.fire(
          errorTitle,
          error.error?.message ||
            `An error occurred during ${errorTitle.toLowerCase()}`,
          'error'
        );
        return throwError(() => error);
      },
    };
  }

  registerWithGoogle(): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/register/google`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(this.handleAuthResponse('Google Registration').success),
        catchError(this.handleAuthResponse('Google Registration').error)
      );
  }

  registerWithFacebook(): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/register/facebook`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(this.handleAuthResponse('Facebook Registration').success),
        catchError(this.handleAuthResponse('Facebook Registration').error)
      );
  }

  signInWithGoogle(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/google`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(this.handleAuthResponse('Google Sign In').success),
        catchError(this.handleAuthResponse('Google Sign In').error)
      );
  }

  signInWithFacebook(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/facebook`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(this.handleAuthResponse('Facebook Sign In').success),
        catchError(this.handleAuthResponse('Facebook Sign In').error)
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.removeItem('token');
    }
  }
}
