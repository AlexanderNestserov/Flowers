import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyordersComponent } from './myorders.component';
import { MyordersRoutingModule } from './myorders-routing.module';

@NgModule({
  declarations: [MyordersComponent],
  imports: [CommonModule, MyordersRoutingModule],
})
export class MyordersModule {}
