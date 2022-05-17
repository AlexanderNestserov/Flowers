import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItem, CreateCart } from '../../cart-order/cart-order.config';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ProductType } from '../../catalog/catalog-categories/product.config';
import { ItemService } from './item.service';
import { Item, Items } from './items.config';

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  cartItem: AddItem[] = [];
  inStock = false;
  id: number[] = [];
  quantityItemsOnPage: number = 8;
  itemsEight: Item[] = [];
  itemsData: Observable<Item[]> = this.http.getItems();

  constructor(
    private http: ItemService,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.itemsData.subscribe((res: Item[]) => {
      this.itemsEight = res.slice(0, this.quantityItemsOnPage);
    });
    this.cartService.getShoppingCart().subscribe((res: CreateCart) => {
      res.orderItems.map((a: AddItem) => {
        this.id.push(a.itemId);
        this.changeDetector.detectChanges();
      });
    });
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

  addToProduct(item: Item): void {
    this.cartService.addToProductDetails(item);
  }
}
