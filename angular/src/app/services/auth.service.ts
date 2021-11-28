import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = '/api/registerUser';
  // private _loginUrl = '/api/auth';
  private _loginUrl = '/api/testLogin';
  private _resendEmailUrl = '/api/sendemail/verify'

  constructor(
    private http: HttpClient) { }

  registerUser(user:IUser) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  resendEmail(userId: string) {
    return this.http.get<any>(`${this._resendEmailUrl}/${userId}`);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
