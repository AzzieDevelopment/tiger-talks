import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITigerSpace, TigerSpaceType } from '../models/tigerspace';
import { TigerSpaceService } from '../services/tigerspace.service';

@Component({
  templateUrl: './tigerspaces-grid.component.html',
  styleUrls: ['./tigerspaces-grid.component.css']
})
export class TigerSpacesGridComponent implements OnInit, OnDestroy {

  pageTitle: string = "Tiger Space Explorer";
  tigerspaces: ITigerSpace[] = []; // all tiger spaces
  academicTigerSpaces: ITigerSpace[] = []; // academic only
  socialTigerSpaces: ITigerSpace[] = []; // social only
  subscription!: any;

  constructor(private tigerSpaceService: TigerSpaceService) { }

  ngOnInit(): void {
    this.subscription = this.tigerSpaceService.getTigerSpaces().subscribe({
      next: response => {
        this.tigerspaces = response;
        this.filterTigerSpaces();
      },
      error: error => console.log(error)
    });
  }

  // filter array of all tiger spaces to specific types
  private filterTigerSpaces(): void {
    this.academicTigerSpaces = this.tigerspaces.filter(tigerSpace => tigerSpace.Type == TigerSpaceType.Academic);
    this.socialTigerSpaces = this.tigerspaces.filter(tigerSpace => tigerSpace.Type == TigerSpaceType.Social);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}