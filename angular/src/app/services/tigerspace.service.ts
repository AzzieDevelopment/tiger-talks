import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITigerSpace } from '../models/tigerspace';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TigerSpaceService {

  private baseUrl: string = '/api';

  constructor(
    private logger: LoggerService,
    private http: HttpClient) { }

    // get tiger space by id
    public getTigerSpace(id: number):Observable<ITigerSpace> {
      return this.http.get<ITigerSpace>(`${this.baseUrl}/gettigerspace/${id}`)
        .pipe(catchError(this.handleError<ITigerSpace>('getTigerSpace')));
    }

    // get all tiger spaces
    public getTigerSpaces(): Observable<ITigerSpace[]> {
      return this.http.get<ITigerSpace[]>(`${this.baseUrl}/gettigerspaces`)
        .pipe(catchError(this.handleError<ITigerSpace[]>('getTigerSpaces')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.logger.error(error);
        return of(result as T);
      }
    }
}