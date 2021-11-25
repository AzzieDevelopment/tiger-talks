import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITigerSpace, TigerSpaceType } from '../models/tigerspace';

@Component({
  templateUrl: './tigerspaces-grid.component.html',
  styleUrls: ['./tigerspaces-grid.component.css']
})
export class TigerSpacesGridComponent implements OnInit {

  pageTitle: string = "Tiger Space Explorer";
  tigerspaces: ITigerSpace[] = []; // all tiger spaces
  academicTigerSpaces: ITigerSpace[] = []; // academic only
  socialTigerSpaces: ITigerSpace[] = []; // social only

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.tigerspaces = data.tigerspaces;
      this.filterTigerSpaces();
    });
  }

  // filter array of all tiger spaces to specific types
  private filterTigerSpaces(): void {
    this.academicTigerSpaces = this.tigerspaces.filter(tigerSpace => tigerSpace.Type == TigerSpaceType.Academic);
    this.socialTigerSpaces = this.tigerspaces.filter(tigerSpace => tigerSpace.Type == TigerSpaceType.Social);
  }

}