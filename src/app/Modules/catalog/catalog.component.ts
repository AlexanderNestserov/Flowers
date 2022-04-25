import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { ItemService } from '../home/items/item.service';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  obs!: Subscription;

  categoriesFilterName: string = '';
  categoriesFilterId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.categoriesFilterId = this.route.snapshot.queryParams['id'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
      this.categoriesFilterId = params['id'];
    });
  }

  ngOnDestroy() {
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }
}
