import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { CartOrderService, DataObjectOrders } from './cart-order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOrderComponent implements OnInit {
  selected: string = 'cash';
  isDisabled = false;
  isChecked = false;
  checked: any = [];
  isLoggedIn = false;
  getUserData: Observable<any> = this.http.getUserData();
  error: any;
  x: number = 0;

  public product: any = [];

  public totalPrice: number = 0;

  formValue: FormGroup = this.formbuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    message: ['', [Validators.maxLength(255)]],
    homeAddress: ['', [Validators.maxLength(255)]],
    additionalInformation: ['', [Validators.maxLength(255)]],
    payment: [this.selected],
    productItems: this.formbuilder.array(this.product),
  });

  constructor(
    private formbuilder: FormBuilder,
    private cartService: CartOrderService,
    public readonly keycloak: KeycloakService,
    private http: AccountService
  ) {}

  async ngOnInit() {
    this.cartService.getItem().subscribe((res) => {
      this.product = res;
      this.totalPrice = Math.ceil(this.cartService.getTotalPrice() * 100) / 100;
    });
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.getUserData.subscribe((error) => {
      this.error = error;
    });
  }

  get firstName() {
    return this.formValue.get('firstName') as FormControl;
  }
  get lastName() {
    return this.formValue.get('lastName') as FormControl;
  }
  get email() {
    return this.formValue.get('email') as FormControl;
  }
  get phone() {
    return this.formValue.get('phone') as FormControl;
  }
  get message() {
    return this.formValue.get('message') as FormControl;
  }
  get homeAddress() {
    return this.formValue.get('homeAddress') as FormControl;
  }
  get additionalInformation() {
    return this.formValue.get('additionalInformation') as FormControl;
  }
  get productItems() {
    return this.formValue.controls['productItems'] as FormArray;
  }

  postDataDetails() {
    this.isDisabled = true;
  }

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  deleteItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  key(event: any, item: any, totalPrice: number) {
    if (event.value == 0 || event.value == null) {
      event.value = 1;
    }

    totalPrice = totalPrice - item.total;
    item.quantity = +event.value;
    item.total = item.quantity * item.priceDto.price;
    item.total = Math.ceil(item.total * 100) / 100;
    totalPrice = totalPrice + item.total;
    this.totalPrice = Math.ceil(totalPrice * 100) / 100;
    console.log(this.selected);
  }

  deleteSelected() {
    this.cartService.removeSelectedCart(this.checked);
  }
}
