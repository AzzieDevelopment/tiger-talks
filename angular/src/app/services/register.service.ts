import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = '/api/registerUser';

  constructor(
    private http: HttpClient) { }

  register(user:IUser) {
    return this.http.post<any>(this.url, user);
  }
}
