import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductType } from '../catalog/catalog-categories/product.config';
import { AddItem, CreateCart } from './cart-order.config';

@Injectable()
export class CartOrderService {
  public cartItemProductList: {}[] = [];
  public productList = new BehaviorSubject<any>([]);
  public productDetailsList = new BehaviorSubject<any>([]);

  public postUrl: string = 'order/checkout';
  public createCartPostUrl: string = 'cart';
  public addItemToCartUrl: string = 'cart/item';

  constructor(private http: HttpClient) {}

  getShoppingCart(): Observable<CreateCart> {
    return this.http.get<CreateCart>(this.createCartPostUrl);
  }

  createCart(): Observable<CreateCart> {
    let body: CreateCart = {
      id: 0,
      orderItems: [],
      text: '',
    };
    return this.http.post<CreateCart>(this.createCartPostUrl, body);
  }

  addItemToCart(product: AddItem): Observable<CreateCart> {
    return this.http.post<CreateCart>(this.addItemToCartUrl, product);
  }

  updateCart(product: any): Observable<CreateCart> {
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

  getProductDetails(): Observable<ProductType[]> {
    return this.productDetailsList.asObservable();
  }

  addToProductDetails(product: any): void {
    this.cartItemProductList.push(product);
    this.productDetailsList.next(this.cartItemProductList);
  }
}
