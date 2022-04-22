import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    username: string;
    surname: string;
    type: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authSub = new BehaviorSubject<AuthData | null>(null); //questa variabile serve per tenere traccia dell'access token
  user$ = this.authSub.asObservable(); //observable
  timeoutRef: any; //timeout per logout

  isLoggedIn$ = this.user$.pipe(map(user=>!!user));
  autologoutTimer:any

  constructor(private http: HttpClient, private router: Router) {
    this.restore()
  }




  login(data: { username: string; password: string }) {
    return this.http
      .post<AuthData>(`${environment.apiBaseUrl}/auth/login`, data)
      .pipe(
        tap((data) => {
          console.log('user auth data:', data);
        }),
        tap((data) => {
          this.authSub.next(data);
          localStorage.setItem('user', JSON.stringify(data));

        }),
        catchError(this.errors)
      );
  }

  register(data: any) {
    return this.http
      .post(`${environment.apiBaseUrl}/auth/signup`, data)
      .pipe(catchError(this.errors));
  }


  restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: AuthData = JSON.parse(userJson);
    this.authSub.next(user);

  }



  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }

  autoLogout(expirationDate:Date){
    const expMs = expirationDate.getTime() - new Date().getTime()
   this.autologoutTimer = setTimeout(() => {
      this.logout()
    }, expMs);


  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email already exists':
        return throwError('Utente gia presente');
        //break;

      default:
        return throwError('Errore nella chimata riprovare');
        //break;
    }
  }
}
