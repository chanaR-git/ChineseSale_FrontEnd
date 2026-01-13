import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';


import { environment } from '../../../enviorments/enviorment';
import { CreateUserModel } from '../models/CreateUser.model';
import { ReadUserModel } from '../models/ReadUser.model';
import { LoginModel } from '../models/Login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private tokenKey ='auth_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private roleSubject = new BehaviorSubject<string | null>(this.decodeToken()?.role || null);
  loggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(createUser: CreateUserModel): Observable<ReadUserModel> {
    return this.http.post<ReadUserModel>(`${this.apiUrl}/register`, createUser);
  }

  login(login: LoginModel): Observable<{token: string}> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login)
            .pipe(tap((response:{token:string})=>{
              if(response.token)
              {
                localStorage.setItem(this.tokenKey, response.token);
                this.loggedInSubject.next(true);
                this.roleSubject.next(this.decodeToken()?.role || null);
              }
            }));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
  }

  private decodeToken(): any | null {
    const token = localStorage.getItem(this.tokenKey);
    
    if (!token) {
      return null;
    }
    
    try {
      const payload = token.split('.')[1];
      const res = JSON.parse(atob(payload));
      console.log("decoded token:", res);
      return res;
    } 
    catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
    
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey) ;
  }

}

