import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ITigerSpace } from '../models/tigerspace';
import { TigerSpaceService } from '../services/tigerspace.service';

@Injectable({
  providedIn: 'root'
})
export class TigerSpaceResolverService implements Resolve<ITigerSpace> {

  constructor(private tigerSpaceService: TigerSpaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ITigerSpace | Observable<ITigerSpace> | Promise<ITigerSpace> {
    return this.tigerSpaceService.getTigerSpace(route.params.id);
  }
}
