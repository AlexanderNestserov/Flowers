import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItem } from '../../cart-order/cart-order.config';
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
  categoriesFilterName!: string;
  categoriesCheckedName!: [];
  itemsLength: any[] = [];
  id: number[] = [];
  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  p: number = 1;
  pageSize = 12;
  constructor(
    private http: ItemService,
    private route: ActivatedRoute,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
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
    this.cartService.getShoppingCart().subscribe((res) => {
      res.orderItems.map((a: any) => {
        this.id.push(a.itemId);
        this.changeDetector.detectChanges();
      });
    });
  }
  onResize(): void {
    if (window.innerWidth < 1145) {
      this.pageSize = 5;
    } else {
      this.pageSize = 12;
    }
  }

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  addToCart(item: any): void {
    item.quantity = 1;
    let product: AddItem = {
      id: 0,
      itemId: item.id,
      priceId: item.priceDto.id,
      quantity: item.quantity,
    };
    this.cartService.addItemToCart(product).subscribe({
      next: (res) => {
        this.cartItem = res.orderItems;
        this.cartService.productList.next(this.cartItem);
        this.cartItem.map((a: any) => {
          this.id.push(a.itemId);
          this.changeDetector.detectChanges();
        });
      },
    });
  }
  addToProducts(item: any): void {
    this.cartService.addToProductDetails(item);
  }
}
