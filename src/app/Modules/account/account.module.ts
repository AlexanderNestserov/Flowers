import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { CartOrderErrorFormModule } from '../cart-order/cart-order-error-form/cart-order-error-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { MapModule } from '../map/map.module';
import { AccountService } from './account.service';
import { PopupErrorSuccessModule } from '../popup-success-error/popupErrorSuccess.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    CartOrderErrorFormModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SpinnerModule,
    ErrorDirectiveModule,
    MapModule,
    PopupErrorSuccessModule,
  ],
  exports: [],
  providers: [AccountService],
})
export class AccountModule {}
