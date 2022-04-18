import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartOrderErrorFormComponent } from './cart-order-error-form.component';

@NgModule({
  declarations: [CartOrderErrorFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CartOrderErrorFormComponent],
})
export class CartOrderErrorFormModule {}
