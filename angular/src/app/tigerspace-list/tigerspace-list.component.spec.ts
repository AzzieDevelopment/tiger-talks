import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerSpaceListComponent } from './tigerspace-list.component';

describe('TigerspaceListComponent', () => {
  let component: TigerSpaceListComponent;
  let fixture: ComponentFixture<TigerSpaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerSpaceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerSpaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
