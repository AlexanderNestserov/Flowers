import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataObjectOrders {
  deliveryAddress: string | undefined;
  deliveryName: '' | undefined;
  deliveryTime: Date | undefined;
  email: '' | undefined;
  id: 0 | undefined;
  orderStatus: '' | undefined;
  paymentType: 'CARD' | undefined;
  phone: '' | undefined;
  productItems:
    | [
        {
          id: number;
          itemId: number;
          priceId: number;
          quantity: number;
        }
      ]
    | undefined;
  text: '' | undefined;
}

export class CreateCart {
  id = 0;
  orderItems = [
    {
      id: 0,
      itemId: 42,
      priceId: 42,
      quantity: 3,
    },
  ];
  text = '';
}

@Injectable()
export class CartOrderService {
  public cartItemList: any = [];
  public cartItemProductList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public productDetailsList = new BehaviorSubject<any>([]);

  public postUrl: string = 'order/checkout';
  public createCartPostUrl: string = 'cart';

  constructor(private http: HttpClient) {}

  postData(formValue: DataObjectOrders): Observable<any> {
    let body: DataObjectOrders = {
      deliveryAddress: formValue.deliveryAddress,
      deliveryName: formValue.deliveryName,
      deliveryTime: new Date(),
      email: formValue.email,
      paymentType: formValue.paymentType,
      phone: formValue.phone,
      productItems: [
        {
          id: 0,
          itemId: 1050,
          priceId: 1071,
          quantity: 1,
        },
      ],
      text: formValue.text,
      id: 0,
      orderStatus: '',
    };

    return this.http.post(this.postUrl, body, {
      responseType: 'text',
    });
  }

  getShoppingCart(): Observable<any> {
    return this.http.get(this.createCartPostUrl, {
      responseType: 'text',
    });
  }

  createCart(): Observable<any> {
    let body: CreateCart = {
      id: 0,
      orderItems: [],
      text: '',
    };
    return this.http.post(this.createCartPostUrl, body);
  }

  getItem() {
    return this.productList.asObservable();
  }

  setItem(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getProductDetails() {
    return this.productDetailsList.asObservable();
  }

  addToCart(product: any) {
    let exist = false;
    for (let i = 0; i < this.cartItemList.length; i++) {
      if (this.cartItemList[i].id == product.id) {
        this.cartItemList[i].quantity = this.cartItemList[i].quantity + 1;
        this.cartItemList[i].total =
          this.cartItemList[i].priceDto.price * this.cartItemList[i].quantity;
        this.cartItemList[i].total =
          Math.ceil(this.cartItemList[i].total * 100) / 100;
        exist = true;
      }
    }
    if (!exist) this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  addToProductDetails(product: any) {
    this.cartItemProductList.push(product);
    this.productDetailsList.next(this.cartItemProductList);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItemList.map((a: any) => {
      totalPrice += a.total;
    });
    return totalPrice;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, i: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(i, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeSelectedCart(productList: any) {
    this.cartItemList = this.cartItemList.filter(
      (x: any) => !productList.includes(x)
    );
    this.productList.next(this.cartItemList);
  }
}
