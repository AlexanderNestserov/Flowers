import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from './item.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  cartItem: { id: number }[] = [];
  element: any;
  inStock = false;

  itemsEight: any;
  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  constructor(
    private http: ItemService,
    private cartService: CartOrderService
  ) {}

  ngOnInit(): void {
    this.itemsData.subscribe((res) => {
      this.itemsEight = res.slice(0, 8);
    });
  }

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  addToCart(item: any) {
    item.quantity = 1;
    item.total = item.quantity * item.priceDto.price;
    this.cartService.addToCart(item);
    this.cartService.getItem().subscribe((res) => {
      this.cartItem = res;
    });
  }

  addToProduct(item: any) {
    this.cartService.addToProductDetails(item);
  }
}
