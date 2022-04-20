import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartOrderService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  getItemCartUrl: string = 'cart';
  addItemUrl: string = 'cart/item';
  constructor(private http: HttpClient) {}

  getItem() {
    return this.productList.asObservable();
  }

  setItem(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItemList.map((a: any) => {
      totalPrice += a.priceDto.price;
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

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
