import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
    logs: string[] = [];

    log(message: string)   { 
        this.logs.push(message);
        console.log(message); 
    }

    error(error: string) { 
        this.logs.push(error);
        console.error(error); 
    }

    warn(warning: string)  { 
        this.logs.push(warning);
        console.warn(warning); 
    }
}