import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-order-error-form',
  templateUrl: './cart-order-error-form.component.html',
  styleUrls: ['./cart-order-error-form.component.scss'],
})
export class CartOrderErrorFormComponent {
  @Input() formControlItem!: FormControl;
}
