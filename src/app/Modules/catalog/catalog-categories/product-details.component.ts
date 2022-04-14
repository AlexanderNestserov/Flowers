import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  itemName: string = '';
  categoryName: string = '';
  price: number = 0;
  shortDescription: string = '';
  description: string = '';
  photo: any;
  isActive: boolean = false;

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
    this.itemName = this.route.snapshot.params['name'];
    this.categoryName = this.route.snapshot.queryParams['categoryName'];
    this.price = this.route.snapshot.queryParams['price'];
    this.description = this.route.snapshot.queryParams['description'];
    this.shortDescription = this.route.snapshot.queryParams['shortDescription'];
    this.photo = this.route.snapshot.queryParams['photo'];

    this.route.params.subscribe((params: Params) => {
      this.itemName = params['name'];
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.categoryName = params['categoryName'];
      this.price = params['price'];
      this.description = params['description'];
      this.shortDescription = params['shortDescription'];
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
  getSecondElement() {
    this.isActive = true;
  }
  getFirstElement() {
    this.isActive = false;
  }

  getPhoto(photo: string): string {
    return `${environment.serverUrl}images/${photo.replace('.jpg', '')}`;
  }
}
