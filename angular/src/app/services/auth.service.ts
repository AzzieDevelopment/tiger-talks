import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = '/api/registerUser';
  private _loginUrl = '/api/auth';
  private _logoutUrl = '/api/logout';
  private _resendEmailUrl = '/api/sendemail/verify';
  private _tokenCookieName = 'token';
  private _netIDCookieName = 'netId';

  constructor(
    private http: HttpClient) { }

  registerUser(user:IUser) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    return this.http.get<any>(this._logoutUrl);
  }

  resendEmail(userId: string) {
    return this.http.get<any>(`${this._resendEmailUrl}/${userId}`);
  }

  loggedIn(): boolean {
    return !!this.getToken();
  }

  getToken() {
    return document.cookie.split('; ').find(row => row.startsWith(`${this._tokenCookieName}=`))?.split('=')[1];
  }

  getNetID(): string {
    let result = document.cookie.split('; ').find(row => row.startsWith(`${this._netIDCookieName}=`))?.split('=')[1];
    return result? result : "";
  }
}
