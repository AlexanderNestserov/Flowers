import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITEMS, SWIPER_CONFIG, ADAPTIVE_SWIPER, Item, Config, Adaptive } from './swiper-list.config';
import { async, Observable, map } from 'rxjs';
import { Obj, SwiperListService } from './swiper-list.service';



@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperListComponent implements OnInit {
  categoriesData: Observable<any> = this.http.getCategories().pipe(map((res: any) => res.content));
  category: any[] = [];
  cat: any;
  items: Array<Item> = ITEMS;
  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;

  constructor(private http: SwiperListService) {


  }
  ngOnInit(): void {


  }
}
