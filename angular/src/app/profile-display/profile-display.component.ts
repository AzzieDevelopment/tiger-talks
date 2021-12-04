import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }


  id=this.route.snapshot.paramMap.get('userId');
  prof!: IUser;

  ngOnInit(): void {
    this.getUser(this.id);
  }

  getUser(uid:any): void {
    this.prof = this.userService.getUser(uid);
  }

}
