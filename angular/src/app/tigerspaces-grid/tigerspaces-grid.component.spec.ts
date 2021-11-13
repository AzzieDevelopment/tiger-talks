import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerSpacesGridComponent } from './tigerspaces-grid.component';

describe('TigerspacesGridComponent', () => {
  let component: TigerSpacesGridComponent;
  let fixture: ComponentFixture<TigerSpacesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerSpacesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerSpacesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
