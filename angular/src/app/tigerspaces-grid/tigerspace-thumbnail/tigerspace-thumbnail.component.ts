import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITigerSpace } from 'src/app/models/tigerspace';

@Component({
  selector: 'tigerspace-thumbnail',
  templateUrl: './tigerspace-thumbnail.component.html',
  styleUrls: ['./tigerspace-thumbnail.component.css']
})
export class TigerspaceThumbnailComponent implements OnInit {

  @Input() tigerspace!: ITigerSpace;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.router.navigate(['tigerspace', this.tigerspace.Id]);
  }

}