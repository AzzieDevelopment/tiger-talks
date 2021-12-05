import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPostsComponent } from './guest-posts.component';

describe('GuestPostsComponent', () => {
  let component: GuestPostsComponent;
  let fixture: ComponentFixture<GuestPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
