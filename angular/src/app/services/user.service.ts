import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BackendService } from './backend.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;

  constructor(
    private backend: BackendService,
    private logger: LoggerService) { }

  getUser(userID: string): any {
    this.backend.getUser(userID).subscribe( (user: User) => {
      this.logger.log(`Fetched user: ${JSON.stringify(user)}`);
      this.user = user;
      return this.user;
    });
  }
}
