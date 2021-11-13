import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tigerspace-thumbnail',
  templateUrl: './tigerspace-thumbnail.component.html',
  styleUrls: ['./tigerspace-thumbnail.component.css']
})
export class TigerspaceThumbnailComponent implements OnInit {

  @Input() tigerspace:any;

  constructor() { }

  ngOnInit(): void {
  }

}