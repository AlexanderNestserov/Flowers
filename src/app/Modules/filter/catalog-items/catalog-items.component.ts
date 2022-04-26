import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.scss'],
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class CatalogItemsComponent implements OnInit {
  searchInput: string = '';
  searchText: {} = {};
  rangeValues: number[] = [];

  cartItem: {}[] = [];
  categoriesFilterName: any;
  categoriesCheckedName: any;
  itemsLength: any[] = [];

  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  p: number = 1;
  pageSize = 12;
  constructor(
    private http: ItemService,
    private route: ActivatedRoute,
    private cartService: CartOrderService
  ) {}
  ngOnInit(): void {
    this.onResize();
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
    });
    this.itemsData.subscribe((res) => {
      this.itemsLength = res;
    });
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
    this.http.filteringByCategories.subscribe((value: any) => {
      this.categoriesCheckedName = value;
    });
    this.http.filteringByCost.subscribe((value: any) => {
      this.rangeValues = value;
    });
    this.http.sorting.subscribe((value: any) => {
      this.searchText = value;
    });
  }
  onResize() {
    if (window.innerWidth < 1145) {
      this.pageSize = 5;
    } else {
      this.pageSize = 12;
    }
  }

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  filter(categories: string) {}

  addToCart(item: any) {
    item.quantity = 1;
    item.total = item.quantity * item.priceDto.price;
    this.cartService.addToCart(item);
    this.cartService.getItem().subscribe((res) => {
      this.cartItem = res;
    });
  }
  addToProducts(item: any) {
    this.cartService.addToProductDetails(item);
  }
}
