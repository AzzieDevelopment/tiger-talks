import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tigerspaces-grid.component.html',
  styleUrls: ['./tigerspaces-grid.component.css']
})
export class TigerSpacesGridComponent implements OnInit {

  academicTigerSpaces = [
    {
      id: 1,
      title: 'College of Business and Economics (CBE)',
      description: 'The Tiger Space for posts related to CBE.',
      type: 'Academic'
    },
    {
      id: 2,
      title: 'College of Education',
      description: 'The Tiger Space for posts related to the College of Education.',
      type: 'Academic'
    },
    {
      id: 3,
      title: 'College of Fine Arts and Communication (CFA)',
      description: 'The Tiger Space for posts related to CFA.',
      type: 'Academic'
    },
    {
      id: 4,
      title: 'College of Health Professionals (CHP)',
      description: 'The Tiger Space for posts related to CHP.',
      type: 'Academic'
    },
    {
      id: 5,
      title: 'College of Liberal Arts (CLA)',
      description: 'The Tiger Space for posts related to CLA.',
      type: 'Academic'
    },
    {
      id: 6,
      title: 'Fisher College of Science and Mathematics (FCSM)',
      description: 'The Tiger Space for posts related to FCSM.',
      type: 'Academic'
    },
    {
      id: 7,
      title: 'Honors College',
      description: 'The Tiger Space for posts related to the Honors College.',
      type: 'Academic'
    }
  ];

  socialTigerSpaces = [
    {
      id: 1,
      title: 'Housing',
      description: 'The Tiger Space for posts related to housing at TU.',
      type: 'Social'
    },
    {
      id: 2,
      title: 'Clubs and Organizations',
      description: 'The Tiger Space for posts related to clubs and organizations at TU.',
      type: 'Social'
    },
    {
      id: 3,
      title: 'Campus Life',
      description: 'The Tiger Space for posts related to campus life at TU.',
      type: 'Social'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}