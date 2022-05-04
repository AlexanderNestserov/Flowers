import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperListComponent } from './swiper-list.component';

import { SwiperModule } from 'swiper/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperListService } from './swiper-list.service';

describe('SwiperListComponent', () => {
  let component: SwiperListComponent;
  let fixture: ComponentFixture<SwiperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwiperListComponent],
      imports: [RouterTestingModule.withRoutes([]), SwiperModule],
      providers: [SwiperListService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
