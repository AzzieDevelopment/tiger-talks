import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorDisplayComponent } from './moderator-display.component';

describe('ModeratorDisplayComponent', () => {
  let component: ModeratorDisplayComponent;
  let fixture: ComponentFixture<ModeratorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
