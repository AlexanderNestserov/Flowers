import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperLogoComponent } from './swiper-logo.component';

describe('SwiperLogoComponent', () => {
  let component: SwiperLogoComponent;
  let fixture: ComponentFixture<SwiperLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwiperLogoComponent],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
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
