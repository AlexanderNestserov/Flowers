import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperLogoComponent } from './swiper-logo.component';

describe('SwiperLogoComponent', () => {
  let component: SwiperLogoComponent;
  let fixture: ComponentFixture<SwiperLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperLogoComponent ]
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
