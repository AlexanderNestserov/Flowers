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
  cartItem: any;
  searchInput: string = '';
  itemsData: Observable<any> = this.http
    .getItems()
    .pipe(map((res: any) => res.content));

  constructor(
    private http: ItemService,
    private cartService: CartOrderService
  ) {}

  ngOnInit(): void {
    this.http.searching.subscribe((value: string) => {
      this.searchInput = value;
    });
  }
  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.cartItem = item;
  }

  addToProduct(item: any) {
    this.cartService.addToProductDetails(item);
  }
}
