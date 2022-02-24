import { Component, ViewEncapsulation, ViewChild, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {



  constructor() {

  }
  ngOnInit(): void {



  }
}