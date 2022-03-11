import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperLogoComponent } from './swiper-logo.component';

import { SwiperModule } from 'swiper/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('SwiperLogoComponent', () => {
  let component: SwiperLogoComponent;
  let fixture: ComponentFixture<SwiperLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwiperLogoComponent],
      imports: [RouterTestingModule.withRoutes([]), SwiperModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
