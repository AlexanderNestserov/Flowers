import { inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartOrderService } from './cart-order.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { AddItem, CreateCart } from './cart-order.config';

describe('ContactsService', () => {
  let service: CartOrderService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CartOrderService],
    });
    service = TestBed.inject(CartOrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAddress', () => {
    let Address: Object;

    beforeEach(() => {
      Address = {
        address: ' some street city Minsk 44 ,11',
        email: 'angular@mail.ru',
        phone: '+34534523542355',
      };
    });
    it('should be createed', inject(
      [CartOrderService],
      (service: CartOrderService) => {
        expect(service).toBeTruthy();
      }
    ));

    it('should add createCart', () => {
      let cart: CreateCart = {
        id: 0,
        orderItems: [],
        text: '',
      };
      service.createCart().subscribe((data) => expect(data).toBeFalsy(), fail);
      const req = httpMock.expectOne(service.createCartPostUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual('cart');
      const expectedResponse = '';
      req.flush(expectedResponse);
    });
    it('should add deleteItem', () => {
      service.deleteItem(3).subscribe((data) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(service.addItemToCartUrl + '/3');
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.url).toEqual('cart/item/3');
    });
    it('should add addToProductDetails', () => {
      let a = service.addToProductDetails({ id: 1 });
      expect(a).toBe();
    });
    it('should add updateCart', () => {
      service.updateCart(3).subscribe((data) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(service.createCartPostUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.url).toEqual('cart');
    });
  });
  it('should add addItemToCart', () => {
    let product: AddItem = {
      id: 0,
      itemId: 1000,
      priceId: 2000,
      quantity: 3,
    };
    service.addItemToCart(product).subscribe((data) => {
      expect(data).toBeTruthy();
    });
    const req = httpMock.expectOne(service.addItemToCartUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.url).toEqual('cart/item');
  });
});
