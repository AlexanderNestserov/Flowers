import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {
  CreateCart,
  GetAllOrders,
  OrderCheckout,
  StripePostOrders,
} from '../cart-order/cart-order.config';
import { CartOrderService } from '../cart-order/cart-order.service';
import { ItemService } from '../home/items/item.service';

import { MyordersComponent } from './myorders.component';

describe('MyordersComponent', () => {
  let component: MyordersComponent;
  let fixture: ComponentFixture<MyordersComponent>;
  let MockCartOrderService = jasmine.createSpyObj('fakeCartOrderService', [
    'getShoppingCart',
    'createCart',
    'addItemToCart',
    'updateCart',
    'deleteItem',
    'getProductDetails',
    'addToProductDetails',
    'productList',
    'productOrderList',
    'postOrder',
    'getOrders',
    'postPaymentCharge',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyordersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, CommonModule, RouterTestingModule],
      providers: [
        {
          provide: CartOrderService,
          useClass: class MockCartOrderService {
            getShoppingCart(): Observable<any> {
              return of({});
            }
            createCart(): Observable<any> {
              return of({});
            }
            addItemToCart(product: any): Observable<any> {
              return of({});
            }
            updateCart(product: any): Observable<any> {
              return of({});
            }
            deleteItem(id: number): Observable<CreateCart> {
              return of({
                id: 333,
                orderItems: [],
                text: 'string',
              });
            }
            getProductDetails() {
              return of({});
            }
            addToProductDetails() {
              return of({});
            }
            productList = new BehaviorSubject([{ id: 1 }, { id: 2 }]);
            productOrderList = new BehaviorSubject(10);
            postOrder(product: OrderCheckout): Observable<GetAllOrders> {
              return of({
                creationDate: 'string',
                deliveryAddress: 'Sloboda',
                deliveryName: 'Jack Dan',
                deliveryTime: '10.10.10',
                email: 'a@a.com',
                id: 394,
                orderStatus: 'PENDING_PAYMENT',
                paymentType: 'CARD',
                phone: '1111111111111',
                productItems: [],
                text: 'hello',
                totalPrice: 222,
              });
            }
            getOrders(): Observable<GetAllOrders[]> {
              return of([]);
            }
            postPaymentCharge(
              product: StripePostOrders
            ): Observable<GetAllOrders> {
              return of({
                creationDate: 'string',
                deliveryAddress: 'Sloboda',
                deliveryName: 'Jack Dan',
                deliveryTime: '10.10.10',
                email: 'a@a.com',
                id: 394,
                orderStatus: 'PENDING_PAYMENT',
                paymentType: 'CARD',
                phone: '1111111111111',
                productItems: [],
                text: 'hello',
                totalPrice: 222,
              });
            }
          },
        },
        ItemService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created key', () => {
    component.orders = [
      {
        creationDate: 'string',
        deliveryAddress: 'Sloboda',
        deliveryName: 'Jack Dan',
        deliveryTime: '10.10.10',
        email: 'a@a.com',
        id: 394,
        orderStatus: 'PENDING_PAYMENT',
        paymentType: 'CARD',
        phone: '1111111111111',
        productItems: [],
        text: 'hello',
        totalPrice: 222,
      },
    ];
    component.orders.map((a: GetAllOrders) => {
      a.paymentType = 'CARD';
    });
    const toggle = component.ngOnInit();
    expect(toggle).toBe();
  });
});
