import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { CartOrderService } from '../Modules/cart-order/cart-order.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToggleButtonModule,
    HeaderRoutingModule,
  ],
  providers: [Location, CartOrderService],
})
export class HeaderModule {}
