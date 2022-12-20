import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyordersComponent } from './myorders.component';
import { MyordersRoutingModule } from './myorders-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { CartOrderService } from '../cart-order/cart-order.service';
import { ItemService } from '../home/items/item.service';

@NgModule({
  declarations: [MyordersComponent],
  imports: [CommonModule, MyordersRoutingModule, AccordionModule],
  providers: [CartOrderService, ItemService],
})
export class MyordersModule {}
