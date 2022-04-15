import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-order-error-form',
  templateUrl: './cart-order-error-form.component.html',
  styleUrls: ['./cart-order-error-form.component.scss'],
})
export class CartOrderErrorFormComponent implements OnInit {
  @Input() formControlItem: any;
  constructor() {}

  ngOnInit(): void {}
}
