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

  constructor() { }

  ngOnInit(): void {
    
  }

  // $(".dropdown-menu li a").click(function(){
  //   $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  //   $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  // });

}