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

  constructor(
    private orderService: CartOrderService,
    private changeDetector: ChangeDetectorRef,
    private itemService: ItemService
  ) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res: GetAllOrders[]) => {
      this.orders = res;
      this.orders.map((a: GetAllOrders) => {
        a.totalPrice = 0;
        if (a.paymentType == 'CARD') {
          a.paymentType = 'In card to the courier';
        } else if (a.paymentType == 'CASH') {
          a.paymentType = 'In cash to the courier';
        } else {
          a.paymentType = 'By bank card on the website';
        }
        a.productItems.map((item: AddItem) => {
          item.total = 0;
          this.itemService.getItem(item.itemId).subscribe((res: Item) => {
            item.total =
              Math.ceil(res.priceDto.price * item.quantity * 100) / 100;
            a.totalPrice += Math.ceil(item.total * 100) / 100;
            a.totalPrice = Math.ceil(a.totalPrice * 100) / 100;
            item.photo = `${environment.serverUrl}images/${res.photo.replace(
              '.jpg',
              ''
            )}`;
            item.category = res.category.name;
            item.name = res.name;
            item.price = res.priceDto.price;
            this.changeDetector.detectChanges();
          });
        });
      });
    });
  }
}
