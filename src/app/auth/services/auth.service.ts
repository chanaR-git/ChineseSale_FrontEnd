import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


import { environment } from '../../../enviorments/enviorment';
import { CreateUserModel } from '../models/CreateUser.model';
import { ReadUserModel } from '../models/ReadUser.model';
import { LoginModel } from '../models/Login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  register(createUser: CreateUserModel): Observable<ReadUserModel> {
    return this.http.post<ReadUserModel>(`${this.apiUrl}/register`, createUser);
  }

  login(login: LoginModel): Observable<{token: string}> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login)
            .pipe(tap((response:{token:string})=>{
              if(response.token)
                localStorage.setItem('auth_token', response.token);
            }));;
  }
}

