import { Component, OnInit, Input } from '@angular/core';
import { ITigerSpace } from 'src/app/models/tigerspace';

@Component({
  selector: 'tigerspace-thumbnail',
  templateUrl: './tigerspace-thumbnail.component.html',
  styleUrls: ['./tigerspace-thumbnail.component.css']
})
export class TigerspaceThumbnailComponent implements OnInit {

  @Input() tigerspace!: ITigerSpace;

  constructor() { }

  ngOnInit(): void {
  }

}