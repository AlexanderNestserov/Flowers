import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
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
import { CartOrderService } from './cart-order.service';

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
          res.quantity = a.quantity;
          res.deleteId = a.id;
          res.total = res.priceDto.price * res.quantity;
          res.total = Math.ceil(res.total * 100) / 100;
          this.totalPrice += res.total;
          this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          this.product.push(res);
        });
      });
    });

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

  postDataDetails() {}

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  deleteItem(item: any) {
    this.cartService.deleteItem(item.deleteId).subscribe({
      next: () => {
        this.cartItem.map((a: any, i: any) => {
          if (item.deleteId === a.id) {
            this.cartItem.splice(i, 1);
            this.cartService.productList.next(this.cartItem);
          }
        });
        this.product.map((a: any, i: any) => {
          if (item.id === a.id) {
            this.product.splice(i, 1);
            this.totalPrice = this.totalPrice - a.total;
            this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          }
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

    this.cartItem.map((a: any, i: any) => {
      if (item.deleteId === a.id) {
        a.quantity = item.quantity;
        this.cartService.productList.next(this.cartItem);
        this.cartService.updateCart(this.cartItem).subscribe({
          next: () => {},
          error: () => {},
        });
      }
    });
  }

  deleteSelected() {
    let yFilter = this.checked.map((item: any) => {
      return item.deleteId;
    });
    let filteredX = this.cartItem.filter((itemX: any) =>
      yFilter.includes(itemX.id)
    );

    filteredX.map((a: any) => {
      this.cartService.deleteItem(a.id).subscribe({
        next: (res: any) => {
          this.newArray = res.orderItems;
          let yFilter = this.newArray.map((item: any) => {
            return item.id;
          });
          this.cartItem = this.cartItem.filter((itemX: any) =>
            yFilter.includes(itemX.id)
          );
          this.product = this.product.filter((itemX: any) =>
            yFilter.includes(itemX.deleteId)
          );
          this.totalPrice = 0;
          this.product.map((a: any) => {
            this.totalPrice += a.total;
          });
          this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          this.cartService.productList.next(this.cartItem);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }
}
