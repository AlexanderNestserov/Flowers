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

  categoriesFilterName: string = '';
  categoriesCheckedName: string = '';

  item: any;
  checked: any;
  searchText: string = '';
  searchInput: string = '';

  categories: any[] = [{ name: 'Max Price' }, { name: 'Min Price' }];

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
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
    });
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
  }

  filterCategories() {
    if (this.checked.length != 0) {
      this.checked[0].name;
    } else {
      this.checked[0].name = '';
    }
    return this.checked[0].name;

    //  if(event.checked.length===0){
    // this.router.navigate(['/catalog'])
    //  }else{
    //this.item = event.checked[0].name;
    //  this.router.navigate(['/catalog'],{queryParams:{name:this.item}});
    // }
    //if (this.categoriesFilterName == '') {
    // this.checked = false;
    //} else {
    //  this.checked = event.checked;
    // }
  }

  filterCategoriesButton(event: any) {
    this.categoriesFilterName = this.filterCategories();

    this.router.navigate(['/catalog'], {
      queryParams: { name: this.categoriesFilterName },
    });
  }

  clearFilter() {
    this.searchText = '';
    this.checked = false;
  }
}
