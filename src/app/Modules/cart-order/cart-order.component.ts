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
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { ItemService } from '../home/items/item.service';
import { ItemsComponent } from '../home/items/items.component';
import { CartOrderService, DataObjectOrders } from './cart-order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOrderComponent implements OnInit {
  selected: string = 'CASH';
  isDisabled = false;
  isChecked = false;
  checked: any = [];
  isLoggedIn = false;

  itemsData: Observable<any> = this.itemService
    .getItems()
    .pipe(map((res: any) => res.content));

  getUserData: Observable<any> = this.http.getUserData();

  getUserCart: Observable<any> = this.cartService.getShoppingCart();
  error: any;
  getTemp: Observable<any> = this.http.getTempId();
  TEMP_ID: string = '';
  listModelObj: DataObjectOrders = new DataObjectOrders();

  newArray: [] = [];

  public product: any = [];

  public cartItem: any = [];

  public totalPrice: number = 0;

  formValue: FormGroup = this.formbuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    deliveryName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    text: ['', [Validators.maxLength(255)]],
    deliveryAddress: ['', [Validators.maxLength(255)]],
    additionalInformation: ['', [Validators.maxLength(255)]],
    paymentType: [this.selected],
    //productItems: [this.product],
  });

  constructor(
    private formbuilder: FormBuilder,
    private cartService: CartOrderService,
    public readonly keycloak: KeycloakService,
    private http: AccountService,
    private itemService: ItemService
  ) {}

  async ngOnInit() {
    this.getUserCart.subscribe((res) => {
      if (res == null) {
        this.cartService.createCart();
      }

      this.cartItem = res.orderItems;

      this.cartItem.map((a: any) => {
        this.itemService.getItem(a.itemId).subscribe((res) => {
          res.quantity = 1;
          res.deleteId = a.id;
          res.total = res.priceDto.price * res.quantity;
          this.totalPrice += res.total;
          this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          this.product.push(res);
          console.log(this.product);
        });
      });
    });

    // this.cartService.getItem().subscribe((res) => {
    //  this.product = res;
    //  this.totalPrice = Math.ceil(this.cartService.getTotalPrice() * 100) / 100;
    // });
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.getUserData.subscribe((error) => {
      this.error = error;
    });

    this.getTemp.subscribe((res) => {
      this.TEMP_ID = res;
    });
  }

  get firstName() {
    return this.formValue.get('firstName') as FormControl;
  }
  get deliveryName() {
    return this.formValue.get('deliveryName') as FormControl;
  }
  get email() {
    return this.formValue.get('email') as FormControl;
  }
  get phone() {
    return this.formValue.get('phone') as FormControl;
  }
  get text() {
    return this.formValue.get('text') as FormControl;
  }
  get deliveryAddress() {
    return this.formValue.get('deliveryAddress') as FormControl;
  }
  get additionalInformation() {
    return this.formValue.get('additionalInformation') as FormControl;
  }
  get paymentType() {
    return this.formValue.get('paymentType') as FormControl;
  }

  postDataDetails() {
    this.listModelObj.deliveryName = this.formValue.value.deliveryName;
    this.listModelObj.deliveryAddress = this.formValue.value.deliveryAddress;
    this.listModelObj.deliveryTime = new Date();
    this.listModelObj.email = this.formValue.value.email;
    this.listModelObj.id = 0;
    this.listModelObj.orderStatus = '';
    this.listModelObj.paymentType = this.formValue.value.payment;
    this.listModelObj.phone = this.formValue.value.phone;
    this.listModelObj.productItems = [
      {
        id: 0,
        itemId: 42,
        priceId: 42,
        quantity: 3,
      },
    ];
    this.listModelObj.text = this.formValue.value.text;

    this.cartService.postData(this.listModelObj).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  deleteItem(item: any) {
    this.cartService.deleteItem(item.deleteId).subscribe({
      next: (res) => {
        this.cartItem.map((a: any, i: any) => {
          if (item.deleteId === a.id) {
            this.cartItem.splice(i, 1);
            this.product.splice(i, 1);
            this.cartService.productList.next(res.orderItems);
          }

          console.log(res.orderItems);
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
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
  }

  deleteSelected() {
    this.cartService.removeSelectedCart(this.checked);
  }
}
