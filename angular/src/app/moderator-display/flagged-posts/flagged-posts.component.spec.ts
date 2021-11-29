import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedPostsComponent } from './flagged-posts.component';

describe('FlaggedPostsComponent', () => {
  let component: FlaggedPostsComponent;
  let fixture: ComponentFixture<FlaggedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlaggedPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
