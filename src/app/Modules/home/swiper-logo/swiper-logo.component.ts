import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home-swiper-logo',
  templateUrl: './swiper-logo.component.html',
  styleUrls: ['./swiper-logo.component.scss']
})
export class SwiperLogoComponent {



}
