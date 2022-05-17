import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItem, CreateCart } from '../../cart-order/cart-order.config';
import { CartOrderService } from '../../cart-order/cart-order.service';
import {
  CategoriesSort,
  ProductType,
} from '../../catalog/catalog-categories/product.config';
import { ItemService } from '../../home/items/item.service';
import { Item, Items } from '../../home/items/items.config';

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
  searchText: CategoriesSort = {
    name: '',
    key: 0,
  };
  rangeValues: number[] = [];

  cartItem: AddItem[] = [];
  categoriesFilterName!: string;
  categoriesCheckedName!: string[];
  id: number[] = [];
  itemsData: Observable<Item[]> = this.http.getItems();

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
      this.changeDetector.detectChanges();
    });
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
    this.http.filteringByCategories.subscribe((value: string[]) => {
      this.categoriesCheckedName = value;
    });
    this.http.filteringByCost.subscribe((value: number[]) => {
      this.rangeValues = value;
    });
    this.http.sorting.subscribe((value: CategoriesSort) => {
      this.searchText = value;
    });
    this.cartService.getShoppingCart().subscribe((res: CreateCart) => {
      res.orderItems.map((a: AddItem) => {
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

  addToCart(item: Item): void {
    let product: AddItem = {
      id: 0,
      itemId: item.id,
      priceId: item.priceDto.id,
      quantity: 1,
    };
    this.cartService.addItemToCart(product).subscribe({
      next: (res: CreateCart) => {
        this.cartItem = res.orderItems;
        this.cartService.productList.next(this.cartItem);
        this.cartItem.map((a: AddItem) => {
          this.id.push(a.itemId);
          this.changeDetector.detectChanges();
        });
      },
    });
  }
  addToProducts(item: Item): void {
    this.cartService.addToProductDetails(item);
  }
}
