import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SWIPER_CONFIG, ADAPTIVE_SWIPER, Config, Adaptive } from './swiper-list.config';
import { Observable, map } from 'rxjs';
import { SwiperListService } from './swiper-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class SwiperListComponent implements OnInit {

  categoriesData: Observable<any> = this.http.getCategories().pipe(map((res: any) =>
    res.content
  ));

  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;

  constructor(private http: SwiperListService) {
   
  }

  ngOnInit(): void {

  }

  getImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

}
