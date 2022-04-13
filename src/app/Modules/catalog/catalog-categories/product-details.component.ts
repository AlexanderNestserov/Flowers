import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemService } from '../../home/items/item.service';
import { SwiperListService } from '../../home/swiper-list/swiper-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  rangeValues: number[] = [0, 300];

  itemsData: any = this.http.getItems().pipe(map((res: any) => res.content));

  categoriesData: Observable<any> = this.httpCategories
    .getCategories()
    .pipe(map((res: any) => res.content));

  itemName: any;
  categoryName: any;

  checked: boolean = false;

  categories: any[] = [{ name: 'Max Price' }, { name: 'Min Price' }];
  searchText: string = '';

  constructor(
    private http: ItemService,
    private httpCategories: SwiperListService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.http.getItems().subscribe(console.log);

    this.itemName = this.route.snapshot.params['name'];
    this.categoryName = this.route.snapshot.queryParams['categoryName'];
    this.route.params.subscribe((params: Params) => {
      this.itemName = params['name'];
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.categoryName = params['categoryName'];
    });
  }
  clearFilter() {
    this.searchText = '';
    this.checked = false;
  }
  label(event: any) {
    //  this.item = event;
    // console.log(this.item.checked[0].name);
    //if (this.itemCategories !== 'Fresh flowers') {
    //  this.cd.detectChanges();
    //}
  }
}
