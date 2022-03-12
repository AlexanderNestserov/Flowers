import { Component, OnInit } from '@angular/core';
import { ITEMS, SWIPER_CONFIG, ADAPTIVE_SWIPER } from './swiper-list.config';

@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss']
})
export class SwiperListComponent {
  items: any[] = ITEMS;
  swiperConfig = SWIPER_CONFIG;
  adaptiveSwiper = ADAPTIVE_SWIPER;
}
