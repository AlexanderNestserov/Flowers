import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddItem } from '../../cart-order/cart-order.config';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ProductType } from '../../catalog/catalog-categories/product.config';
import { ItemService } from './item.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  cartItem: {}[] = [];
  inStock = false;
  id: number[] = [];

  itemsEight: ProductType[] = [];
  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  constructor(
    private http: ItemService,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.itemsData.subscribe((res) => {
      this.itemsEight = res.slice(0, 8);
    });
    this.cartService.getShoppingCart().subscribe((res) => {
      res.orderItems.map((a: any) => {
        this.id.push(a.itemId);
        this.changeDetector.detectChanges();
      });
    });
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

  addToProduct(item: any): void {
    this.cartService.addToProductDetails(item);
  }
}
