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
  isFilterShow = false;
  isSortingShow = false;
  selectedCategory: {} = {};
  selectedItems: string[] = [];

  categoriesFilterName: string = '';
  categoriesCheckedName: string[] = [];

  checked: string[] = [];
  searchText: {} = {};
  searchInput: string = '';
  categories: any[] = [
    { name: 'By cost (ascending)', key: 1 },
    { name: 'By cost (descending)', key: 2 },
    { name: 'By name (A - Z)', key: 3 },
    { name: 'By name (Z - A)', key: 4 },
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
    });
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
  }

  filterCategoriesButton(): void {
    if (this.searchInput) {
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/catalog']);
    }

    this.isFilterShow = false;
    document.body.style.overflow = 'scroll';
    this.categoriesCheckedName = this.checked;
    this.http.filteringByCategories.next(this.categoriesCheckedName);
    this.http.filteringByCost.next(this.rangeValues);
  }

  sortingCategoriesButton(): void {
    this.http.sorting.next(this.selectedCategory);
    this.isSortingShow = false;
    document.body.style.overflow = 'scroll';
  }

  clearFilter(): void {
    this.searchText = {};
    this.selectedCategory = this.categories[0];
    this.checked = [];
    this.categoriesCheckedName = [];
    this.rangeValues = [];
    this.http.filteringByCategories.next(this.categoriesCheckedName);
    this.http.filteringByCost.next(this.rangeValues);
    this.http.sorting.next(this.searchText);
    this.http.sorting.next(this.selectedCategory);
  }

  handle(): void {
    this.http.sorting.next(this.searchText);
  }

  filterDisplay(): void {
    this.isFilterShow = !this.isFilterShow;
    if (this.isFilterShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }

  sortingDisplay(): void {
    this.isSortingShow = !this.isSortingShow;
    if (this.isSortingShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }
}
