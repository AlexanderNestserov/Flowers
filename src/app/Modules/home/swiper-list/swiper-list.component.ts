<<<<<<< HEAD
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SWIPER_CONFIG, ADAPTIVE_SWIPER, Config, Adaptive } from './swiper-list.config';
import { Observable, map } from 'rxjs';
import { SwiperListService } from './swiper-list.service';
import { environment } from 'src/environments/environment';
=======
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Adaptive, ADAPTIVE_SWIPER, Config, Item, ITEMS, SWIPER_CONFIG } from './swiper-list.config';
import { Observable, map } from 'rxjs';
import { SwiperListService } from './swiper-list.service';
import { environment } from '../../../../environments/environment';
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead

@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


<<<<<<< HEAD
export class SwiperListComponent implements OnInit {

  categoriesData: Observable<any> = this.http.getCategories().pipe(map((res: any) =>
    res.content
  ));

=======
export class SwiperListComponent {
  src: [] = [];
  categoriesData: Observable<any> = this.http.getCategories().pipe(map((res: any) =>
    res.content
  ));
  category: any[] = [];
  items: Array<Item> = ITEMS;
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;

  constructor(private http: SwiperListService) {
<<<<<<< HEAD
   
  }

  ngOnInit(): void {

  }

  getImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

=======
  }

  getImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
}
