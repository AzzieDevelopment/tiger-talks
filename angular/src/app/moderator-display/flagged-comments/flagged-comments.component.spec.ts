import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedCommentsComponent } from './flagged-comments.component';

describe('FlaggedCommentsComponent', () => {
  let component: FlaggedCommentsComponent;
  let fixture: ComponentFixture<FlaggedCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlaggedCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
