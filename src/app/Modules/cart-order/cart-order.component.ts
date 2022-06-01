import { Content } from '@angular/compiler/src/render3/r3_ast';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountUser } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { ItemService } from '../home/items/item.service';
import { Items, Item } from '../home/items/items.config';
import { AddItem, CreateCart, EventInput, KeyItem } from './cart-order.config';
import { CartOrderService } from './cart-order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: [
    './cart-order.component.scss',
    '../../Modules/account/input-form-style.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOrderComponent implements OnInit {
  @ViewChild('search') input!: ElementRef;
  selected: string = 'CASH';
  isDisabled = false;
  isChecked = false;
  checked: Item[] = [];
  isLoggedIn = false;
  addressValue: string = '';

  itemsData: Observable<Item[]> = this.itemService.getItems();
  getUserData: Observable<AccountUser> = this.http.getUserData();
  getUserCart: Observable<CreateCart> = this.cartService.getShoppingCart();
  getTemp: Observable<string> = this.http.getTempId();

  TEMP_ID: string = '';
  deleteSelectedItems: AddItem[] = [];

  public product: Item[] = [];
  public cartItem: AddItem[] = [];
  public totalPrice: number = 0;

  formValue: FormGroup = this.formbuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    text: ['', [Validators.maxLength(255)]],
    homeAddress: ['', [Validators.maxLength(255)]],
    additionalInformation: ['', [Validators.maxLength(255)]],
    paymentType: [this.selected],
  });

  constructor(
    private formbuilder: FormBuilder,
    private cartService: CartOrderService,
    private http: AccountService,
    private itemService: ItemService,
    public readonly keycloak: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getUserCart.subscribe((res: CreateCart) => {
      if (!res) {
        this.cartService.createCart();
      }
      this.cartItem = res.orderItems;
      this.cartItem.map((a: AddItem) => {
        this.itemService.getItem(a.itemId).subscribe((res: Item) => {
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
    this.getUserData.subscribe({
      next: (user: AccountUser) => {
        this.formValue.patchValue({ ...user });
      },
    });

    this.http.mapAddress.subscribe((res: string) => {
      this.formValue.patchValue({ homeAddress: res });
    });

    this.getTemp.subscribe((res: string) => {
      this.TEMP_ID = res;
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
  get text() {
    return this.formValue.get('text') as FormControl;
  }
  get homeAddress() {
    return this.formValue.get('homeAddress') as FormControl;
  }
  get additionalInformation() {
    return this.formValue.get('additionalInformation') as FormControl;
  }
  get paymentType() {
    return this.formValue.get('paymentType') as FormControl;
  }

  postDataDetails(): void {}

  getItemImage(item: string): string {
    return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }

  deleteItem(item: Item): void {
    this.cartService.deleteItem(item.deleteId!).subscribe({
      next: () => {
        this.cartItem.map((a: AddItem, i: number) => {
          if (item.deleteId === a.id) {
            this.cartItem.splice(i, 1);
            this.cartService.productList.next(this.cartItem);
          }
        });
        this.product.map((a: Item, i: number) => {
          if (item.id === a.id) {
            this.product.splice(i, 1);
            this.totalPrice = this.totalPrice - a.total!;
            this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          }
        });
      },
    });
  }

  key(event: EventInput, item: Item, totalPrice: number): void {
    let itemQuantity = event.value;
    if (!event.value) {
      itemQuantity = 1;
    }
    totalPrice = totalPrice - item.total!;
    item.quantity = +itemQuantity;
    item.total = item.quantity * item.priceDto.price;
    item.total = Math.ceil(item.total * 100) / 100;
    totalPrice = totalPrice + item.total;
    this.totalPrice = Math.ceil(totalPrice * 100) / 100;

    this.cartItem.map((a: AddItem) => {
      if (item.deleteId === a.id) {
        a.quantity = item.quantity!;
        this.cartService.productList.next(this.cartItem);
        this.cartService.updateCart(this.cartItem).subscribe();
      }
    });
  }

  deleteSelected(): void {
    let yFilter = this.checked.map((item: Item) => {
      return item.deleteId;
    });
    let filteredX = this.cartItem.filter((itemX: AddItem) =>
      yFilter.includes(itemX.id)
    );

    filteredX.map((a: AddItem) => {
      this.cartService.deleteItem(a.id).subscribe({
        next: (res: CreateCart) => {
          this.deleteSelectedItems = res.orderItems;
          let yFilter = this.deleteSelectedItems.map((item: AddItem) => {
            return item.id;
          });
          this.cartItem = this.cartItem.filter((itemX: AddItem) =>
            yFilter.includes(itemX.id)
          );
          this.product = this.product.filter((itemX: Item) =>
            yFilter.includes(itemX.deleteId!)
          );
          this.totalPrice = 0;
          this.product.map((a: Item) => {
            this.totalPrice += a.total!;
          });
          this.totalPrice = Math.ceil(this.totalPrice * 100) / 100;
          this.cartService.productList.next(this.cartItem);
        },
      });
    });
  }
  searchMapAdress(event: KeyboardEvent) {
    this.addressValue = (event.target as HTMLInputElement).value;
    this.http.addressHTML.next(this.input);
    this.http.address.next(this.addressValue);
  }
}
