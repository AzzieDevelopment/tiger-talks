import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../models/user';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = '/api';

  constructor(
    private logger: LoggerService,
    private http: HttpClient) { }

    // get user from Id
    public getUser(userID: string):Observable<IUser> {
      return this.http.get<IUser>(`${this.baseUrl}/getuser/${userID}`)
        .pipe(catchError(this.handleError<IUser>('getUser')));
    }

    // get all users
    public getUsers(): Observable<IUser[]> {
      return this.http.get<IUser[]>(`${this.baseUrl}/getusers`)
        .pipe(catchError(this.handleError<IUser[]>('getUsers')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.logger.error(error);
        return of(result as T);
      }
    }

}
