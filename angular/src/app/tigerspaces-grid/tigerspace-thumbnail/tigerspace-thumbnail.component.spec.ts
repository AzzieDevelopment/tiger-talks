import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerspaceThumbnailComponent } from './tigerspace-thumbnail.component';

describe('TigerspaceThumbnailComponent', () => {
  let component: TigerspaceThumbnailComponent;
  let fixture: ComponentFixture<TigerspaceThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerspaceThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerspaceThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
