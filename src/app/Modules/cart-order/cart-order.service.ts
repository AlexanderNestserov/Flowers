import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartOrderService {
  public cartItemList: any = [];
  public cartItemProductList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public productDetailsList = new BehaviorSubject<any>([]);

  constructor() {}

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
    this.cartItemList.push(product);
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
      totalPrice += a.priceDto.price;
    });
    return +totalPrice;
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
