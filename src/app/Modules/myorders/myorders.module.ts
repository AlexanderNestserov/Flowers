import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyordersComponent } from './myorders.component';
import { MyordersRoutingModule } from './myorders-routing.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [MyordersComponent],
  imports: [CommonModule, MyordersRoutingModule, AccordionModule],
})
export class MyordersModule {}
