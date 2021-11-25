import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerpageComponent } from './tigerpage.component';

describe('TigerpageComponent', () => {
  let component: TigerpageComponent;
  let fixture: ComponentFixture<TigerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
