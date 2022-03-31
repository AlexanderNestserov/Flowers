import { Component, OnInit } from '@angular/core';
import { ITEMS, SWIPER_CONFIG, ADAPTIVE_SWIPER, Item, Config, Adaptive } from './swiper-list.config';

@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss']
})
export class SwiperListComponent {
  items: Array<Item> = ITEMS;
  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;
}
