import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Adaptive, ADAPTIVE_SWIPER, Config, Item, ITEMS, SWIPER_CONFIG } from './swiper-list.config';
import { map } from 'rxjs';
import { SwiperListService } from './swiper-list.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class SwiperListComponent {
  src: [] = [];
  categoriesData: any = this.http.getCategories().pipe(map((res: any) =>
    res.content
  ));
  category: any[] = [];
  items: Array<Item> = ITEMS;
  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;

  constructor(private http: SwiperListService) {
    this.http.getCategories().subscribe(console.log)
  }

  getImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }
}
