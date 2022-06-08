import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../home/items/items.config';
import {
  AddItem,
  CreateCart,
  GetAllOrders,
  GetPayments,
  OrderCheckout,
  PriceChanges,
  StripePostOrders,
} from './cart-order.config';

@Injectable()
export class CartOrderService {
  public cartItemProductList: Item[] = [];
  public productList = new BehaviorSubject<AddItem[]>([]);
  public productOrderList = new BehaviorSubject<number>(0);
  public productDetailsList = new BehaviorSubject<Item[]>([]);

  public orderUrl: string = 'order';
  public createCartPostUrl: string = 'cart';
  public addItemToCartUrl: string = 'cart/item';
  public orderCheckoutUrl: string = 'order/checkout';
  public orderStripeUrl: string = 'payments/charge';
  public paymentsUrl: string = 'payments';
  public priceChangesItemUrl: string = 'price';

  constructor(private http: HttpClient) {}

  getShoppingCart(): Observable<CreateCart> {
    return this.http.get<CreateCart>(this.createCartPostUrl);
  }

  getPriceChanges(id: number): Observable<PriceChanges[]> {
    return this.http.get<PriceChanges[]>(this.priceChangesItemUrl + `/${id}`);
  }

  createCart(): Observable<CreateCart> {
    let body: CreateCart = {
      id: 0,
      orderItems: [
        {
          id: 0,
          itemId: 0,
          priceId: 0,
          quantity: 0,
        },
      ],
      text: '',
    };
    return this.http.post<CreateCart>(this.createCartPostUrl, body);
  }

  addItemToCart(product: AddItem): Observable<CreateCart> {
    return this.http.post<CreateCart>(this.addItemToCartUrl, product);
  }

  updateCart(product: AddItem[]): Observable<CreateCart> {
    let body: CreateCart = {
      id: 0,
      orderItems: product,
      text: '',
    };
    return this.http.put<CreateCart>(this.createCartPostUrl, body);
  }

  deleteItem(id: number): Observable<CreateCart> {
    return this.http.delete<CreateCart>(this.addItemToCartUrl + `/${id}`);
  }

  getProductDetails(): Observable<Item[]> {
    return this.productDetailsList.asObservable();
  }

  addToProductDetails(product: Item): void {
    this.cartItemProductList.push(product);
    this.productDetailsList.next(this.cartItemProductList);
  }

  postOrder(product: OrderCheckout): Observable<GetAllOrders> {
    return this.http.post<GetAllOrders>(this.orderCheckoutUrl, product);
  }

  getOrders(): Observable<GetAllOrders[]> {
    return this.http.get<GetAllOrders[]>(this.orderUrl);
  }

  postPaymentCharge(product: StripePostOrders): Observable<GetAllOrders> {
    return this.http.post<GetAllOrders>(this.orderStripeUrl, product);
  }

  getPayments(): Observable<any> {
    return this.http.get<any>(this.paymentsUrl);
  }
}
