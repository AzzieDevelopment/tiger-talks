import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tigerspace-list',
  templateUrl: './tigerspace-list.component.html',
  styleUrls: ['./tigerspace-list.component.css']
})
export class TigerSpaceListComponent implements OnInit {

  tigerspace = {
    "title": "Fisher College of Science & Mathematics",
    "description": "The Jess and Mildred Fisher College of Science and Mathematics offers undergraduate and graduate programs in the physical, mathematical, computational and life sciences, with an emphasis on student success through improving student retention, persistence and time-to-graduation.",
    "type": "Academic" 
  };

  constructor() { }

  ngOnInit(): void {
  }

}
