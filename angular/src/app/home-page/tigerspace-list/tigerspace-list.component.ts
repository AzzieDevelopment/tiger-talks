import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'tigerspace-list',
  templateUrl: './tigerspace-list.component.html',
  styleUrls: ['./tigerspace-list.component.css']
})
export class TigerSpaceListComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  redirectMakeTigerSpace() {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['signin']);
    } else {
      this.router.navigate(['maketigerspace']);
    }
  }

}
