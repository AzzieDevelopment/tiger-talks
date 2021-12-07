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

  private _getTigerSpaceBaseUrl = '/api/gettigerspace';
  private _getAllTigerSpacesUrl = '/api/gettigerspaces';
  private _createTigerSpaceUrl = '/api/createtigerspace';

  constructor(
    private logger: LoggerService,
    private http: HttpClient) { }

    // get tiger space by id
    public getTigerSpace(id: number):Observable<ITigerSpace> {
      return this.http.get<ITigerSpace>(`${this._getTigerSpaceBaseUrl}/${id}`)
        .pipe(catchError(this.handleError<ITigerSpace>('getTigerSpace')));
    }

    // get all tiger spaces
    public getTigerSpaces(): Observable<ITigerSpace[]> {
      return this.http.get<ITigerSpace[]>(`${this._getAllTigerSpacesUrl}`)
        .pipe(catchError(this.handleError<ITigerSpace[]>('getTigerSpaces')));
    }

    // create tiger space
    public createTigerSpace(tigerspace: ITigerSpace): Observable<any> {
      return this.http.post(`${this._createTigerSpaceUrl}`, tigerspace);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.logger.error(error);
        return of(result as T);
      }
    }
}
