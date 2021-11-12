import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Category{
  name: string;
}

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit {

  postForm = new FormGroup({
    title : new FormControl(''),
    body : new FormControl(''),
    category: new FormControl([])
  });

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  categories: Category[] = [
    {name: 'Computer Science'},
    {name: 'Science'},
    {name: 'Math'}
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    //add category
    if (value) {
      this.categories.push({name: value});
    }
    //clear input
    event.chipInput!.clear();
  }

  remove(category: Category): void{
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
