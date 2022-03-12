import { Component } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { SWIPER_CONFIG } from './swiper-logo.config';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home-swiper-logo',
  templateUrl: './swiper-logo.component.html',
  styleUrls: ['./swiper-logo.component.scss']
})

export class SwiperLogoComponent {
  swiperConfig = SWIPER_CONFIG
}
