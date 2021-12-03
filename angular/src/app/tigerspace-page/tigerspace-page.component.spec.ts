import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerSpacePageComponent } from './tigerspace-page.component';

describe('TigerpageComponent', () => {
  let component: TigerSpacePageComponent;
  let fixture: ComponentFixture<TigerSpacePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerSpacePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerSpacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
