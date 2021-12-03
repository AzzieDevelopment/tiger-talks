import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IFaculty, IStudent, IUser } from '../models/user';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _getUsersUrl = '/api/getusers';
  private _getUserBaseUrl = '/api/getuser';
  private _getStudentBaseUrl = '/api/getstudent';
  private _getFacultyBaseUrl = '/api/getfaculty';

  constructor(
    private logger: LoggerService,
    private http: HttpClient) { }

    // get user from Id
    public getUser(userID: string):Observable<IUser> {
      return this.http.get<IUser>(`${this._getUserBaseUrl}/${userID}`)
        .pipe(catchError(this.handleError<IUser>('getUser')));
    }

    // get all users
    public getUsers(): Observable<IUser[]> {
      return this.http.get<IUser[]>(this._getUsersUrl)
        .pipe(catchError(this.handleError<IUser[]>('getUsers')));
    }

    // get student
    public getStudent(userID: string): Observable<IStudent> {
      return this.http.get<IStudent>(`${this._getStudentBaseUrl}/${userID}`)
        .pipe(catchError(this.handleError<IStudent>('getStudent')));
    }

    // get faculty
    public getFaculty(userID: string): Observable<IFaculty> {
      return this.http.get<IFaculty>(`${this._getFacultyBaseUrl}/${userID}`)
        .pipe(catchError(this.handleError<IFaculty>('getFaculty')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.logger.error(error);
        return of(result as T);
      }
    }

}
