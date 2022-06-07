import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddItem, GetAllOrders } from '../cart-order/cart-order.config';
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
  constructor(
    private orderService: CartOrderService,
    private changeDetector: ChangeDetectorRef,
    private itemService: ItemService
  ) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res: GetAllOrders[]) => {
      this.orders = res;

      this.orders.map((a: GetAllOrders) => {
        a.productItems.map((res: AddItem) => {
          this.itemService.getItem(res.itemId).subscribe((res: Item) => {
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

      this.changeDetector.detectChanges();
    });
    this.orderService;
  }
}
