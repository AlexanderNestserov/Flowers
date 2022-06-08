import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AddItem,
  GetAllOrders,
  GetPayments,
} from '../cart-order/cart-order.config';
import { CartOrderService } from '../cart-order/cart-order.service';
import { ItemService } from '../home/items/item.service';
import { Item } from '../home/items/items.config';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss'],
})
export class MyordersComponent implements OnInit {
  orders!: GetAllOrders[];
  quantity: number = 0;
  total: number = 0;
  constructor(
    private orderService: CartOrderService,
    private changeDetector: ChangeDetectorRef,
    private itemService: ItemService
  ) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res: GetAllOrders[]) => {
      this.orders = res;
      console.log(res);

      this.orders.map((a: GetAllOrders) => {
        a.totalPrice = 0;
        a.productItems.map((item: AddItem) => {
          this.quantity = item.quantity;
          this.itemService.getItem(item.itemId).subscribe((res: Item) => {
            console.log(res);
            a.totalPrice += res.priceDto.price * this.quantity;

            item.photo = res.photo;

            this.changeDetector.detectChanges();
            /*         
        res.quantity = a.quantity;
        res.deleteId = a.id;
        res.total = res.priceDto.price * res.quantity;
        res.total = Math.ceil(res.total * 100) / 100;
        this.totalPrice += res.total;
        this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
        this.product.push(res);*/
          });
        });
      });
    });
  }
  getItemImage(item: string): string {
    return ''; //return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }
}
