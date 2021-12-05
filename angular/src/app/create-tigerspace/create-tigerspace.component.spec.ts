import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTigerspaceComponent } from './create-tigerspace.component';

describe('CreateTigerspaceComponent', () => {
  let component: CreateTigerspaceComponent;
  let fixture: ComponentFixture<CreateTigerspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTigerspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTigerspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
