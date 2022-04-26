import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemService } from '../home/items/item.service';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  rangeValues: number[] = [0, 300];
  isShow = false;

  selectedItems: string[] = [];

  categoriesFilterName: string = '';
  categoriesCheckedName: [] = [];

  checked: [] = [];
  searchText: {} = {};
  searchInput: string = '';

  categories: any[] = [
    { name: 'Max Price' },
    { name: 'Min Price' },
    { name: 'By Name' },
  ];

  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  categoriesData: Observable<any> = this.httpCategories
    .getCategories()
    .pipe(map((res: any) => res.content));

  constructor(
    private httpCategories: SwiperListService,
    private http: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
    });
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
  }

  filterCategoriesButton() {
    this.filterDisplay();
    this.categoriesCheckedName = this.checked;
    this.http.filteringByCategories.next(this.categoriesCheckedName);
    this.http.filteringByCost.next(this.rangeValues);
  }

  clearFilter() {
    this.filterDisplay();
    this.searchText = {};
    this.checked = [];
    this.categoriesCheckedName = [];
    this.rangeValues = [];
    this.http.filteringByCategories.next(this.categoriesCheckedName);
    this.http.filteringByCost.next(this.rangeValues);
    this.http.sorting.next(this.searchText);
  }

  handle() {
    this.http.sorting.next(this.searchText);
  }

  filterDisplay() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }
}
