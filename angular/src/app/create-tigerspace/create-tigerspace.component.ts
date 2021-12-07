import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITigerSpace, TigerSpaceType } from '../models/tigerspace';
import { IUser, UserType } from '../models/user';
import { AuthService } from '../services/auth.service';
import { TigerSpaceService } from '../services/tigerspace.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './create-tigerspace.component.html',
  styleUrls: ['./create-tigerspace.component.css']
})
export class CreateTigerspaceComponent implements OnInit, OnDestroy {

  pageTitle = "Create Tiger Space";
  newTigerSpaceData: any = {
    type: ""
  };
  user!: IUser;
  isFaculty: boolean = false;
  userSub!: Subscription;
  tigerspaceSub!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tigerSpaceService: TigerSpaceService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
      data => {
        this.user = data;
        this.isFaculty = (this.user.UserType === UserType.Faculty);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.tigerspaceSub?.unsubscribe();
  }

  getTigerSpaceType(): number {
    if (this.newTigerSpaceData.type === "Academic") {
      return TigerSpaceType.Academic;
    } else {
      return TigerSpaceType.Social;
    }
  }

  getTigerSpaceData(): ITigerSpace {
    return {
      Id: 0, // BE sets this up
      UserId: "", // BE sets this up,
      Title: this.newTigerSpaceData.title,
      Description: this.newTigerSpaceData.description,
      Type: this.getTigerSpaceType()
    };
  }

  onSubmit() {
    let tigerspace: ITigerSpace = this.getTigerSpaceData();
    this.tigerspaceSub = this.tigerSpaceService.createTigerSpace(tigerspace).subscribe(
      data => {
        this.router.navigate(['/tigerspaces']);
      },
      err => console.log(err)
    );
  }

}
