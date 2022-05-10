import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddItem, CreateCart } from './cart-order.config';

@Injectable()
export class CartOrderService {
  public cartItemList: any = [];
  public cartItemProductList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public productDetailsList = new BehaviorSubject<any>([]);

  public cartLength = new BehaviorSubject<number>(0);

  public postUrl: string = 'order/checkout';
  public createCartPostUrl: string = 'cart';
  public addItemToCartUrl: string = 'cart/item';
  static productList: any;

  constructor(private http: HttpClient) {}

  getShoppingCart(): Observable<any> {
    return this.http.get<any>(this.createCartPostUrl);
  }

  createCart(): Observable<any> {
    let body: CreateCart = {
      id: 0,
      orderItems: [],
      text: '',
    };
    return this.http.post(this.createCartPostUrl, body);
  }

  addItemToCart(product: AddItem): Observable<any> {
    return this.http.post(this.addItemToCartUrl, product);
  }

  updateCart(product: any): Observable<any> {
    let body: CreateCart = {
      id: 0,
      orderItems: product,
      text: '',
    };

    return this.http.put(this.createCartPostUrl, body);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.addItemToCartUrl + `/${id}`);
  }

  getProductDetails() {
    return this.productDetailsList.asObservable();
  }

  addToProductDetails(product: any) {
    this.cartItemProductList.push(product);
    this.productDetailsList.next(this.cartItemProductList);
  }
}
