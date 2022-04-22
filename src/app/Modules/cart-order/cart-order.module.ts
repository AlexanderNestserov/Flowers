import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartOrderRoutingModule } from './cart-order-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

import { CartOrderComponent } from './cart-order.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';
import { CartOrderErrorFormModule } from './cart-order-error-form/cart-order-error-form.module';
import { AccountService } from '../account/account.service';

@NgModule({
  declarations: [CartOrderComponent],
  imports: [
    CommonModule,
    CartOrderRoutingModule,
    CheckboxModule,
    InputNumberModule,
    SpinnerModule,
    ErrorDirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MapModule,
    CartOrderErrorFormModule,
  ],
  providers: [AccountService],
})
export class CartOrderModule {}
