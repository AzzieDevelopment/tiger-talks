import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
    // Define API
    apiURL = '/api';

    constructor(private httpClient: HttpClient) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getUser(userID: string): Observable<User> {
        return this.httpClient.get<User>(`${this.apiURL}/getuser/${userID}`);
    }
}
