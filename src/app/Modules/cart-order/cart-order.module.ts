import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartOrderRoutingModule } from './cart-order-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

import { CartOrderComponent } from './cart-order.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormRegistrationModule } from '../registration/error-form/error-form.module';

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
    ErrorFormRegistrationModule,
  ],
})
export class CartOrderModule {}
