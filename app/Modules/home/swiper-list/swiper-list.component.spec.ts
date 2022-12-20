import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwiperListComponent } from './swiper-list.component';

import { SwiperModule } from 'swiper/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperListService } from './swiper-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SwiperListComponent', () => {
  let component: SwiperListComponent;
  let fixture: ComponentFixture<SwiperListComponent>;
  let service: SwiperListService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwiperListComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        SwiperModule,
        HttpClientTestingModule,
      ],
      providers: [SwiperListService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SwiperListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
});
