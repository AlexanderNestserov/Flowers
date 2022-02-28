import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderLogoComponent } from './slider-logo.component';

describe('SliderLogoComponent', () => {
  let component: SliderLogoComponent;
  let fixture: ComponentFixture<SliderLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
