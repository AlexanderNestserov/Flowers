import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { AccountService } from '../account/account.service';
import { ItemService } from '../home/items/item.service';
import { CartOrderErrorFormModule } from './cart-order-error-form/cart-order-error-form.module';

import { CartOrderComponent } from './cart-order.component';
import { CartOrderService } from './cart-order.service';

describe('CartOrderComponent', () => {
  let component: CartOrderComponent;
  let fixture: ComponentFixture<CartOrderComponent>;
  let accountService = AccountService;
  let itemService = ItemService;
  let cartOrderService = CartOrderService;
  let MockAccountService = jasmine.createSpyObj('fakeAccountService', [
    'getUserData',
    'patchData',
    'postChangePassword',
  ]);
  let MockItemService = jasmine.createSpyObj('fakeItemService', [
    'getItems',
    'getItem',
  ]);
  let MockCartOrderService = jasmine.createSpyObj('fakeCartOrderService', [
    'getShoppingCart',
    'createCart',
    'addItemToCart',
    'updateCart',
    'deleteItem',
    'getProductDetails',
    'addToProductDetails',
    'productList',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartOrderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        KeycloakAngularModule,
        CartOrderErrorFormModule,
        ErrorDirectiveModule,
        RadioButtonModule,
      ],
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
            deleteItem(id: number): Observable<any> {
              return of({ orderItems: [{ id: 1 }] });
            }
            getProductDetails() {
              return of({});
            }
            addToProductDetails() {
              return of({});
            }
            productList = new BehaviorSubject([{ id: 1 }, { id: 2 }]);
          },
        },
        { provide: KeycloakService, useValue: KeycloakService },
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(formValue: any): Observable<any> {
              return of({ id: 1 });
            }
            patchData() {
              return of({});
            }
            postChangePassword(formChangePassword: any) {
              return of({});
            }
            getTempId(): Observable<any> {
              return of({ id: 1 });
            }
          },
        },
        {
          provide: ItemService,
          useClass: class MockItemService {
            getItems(): Observable<any> {
              return of({ content: [{ id: 1 }] });
            }
            getItem() {
              return of({});
            }
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created text', () => {
    const result = component.text;
    expect(result).toBeTruthy();
  });
  it('should be created deliveryAddress', () => {
    const result = component.deliveryAddress;
    expect(result).toBeTruthy();
  });
  it('should be created additionalInformation', () => {
    const result = component.additionalInformation;
    expect(result).toBeTruthy();
  });
  it('should be created postDataDetails', () => {
    const toggle = component.postDataDetails();
    expect(toggle).toBe();
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should be created deleteItem', () => {
    let item = { deleteId: 1000 };
    component.cartItem = [{ id: 1 }, { id: 2 }];
    const toggle = component.deleteItem(item.deleteId);
    expect(toggle).toBe();
  });
  it('should be created deleteSelected and filter', () => {
    component.cartItem = [{ id: 1 }, { id: 2 }];
    const toggle = component.deleteSelected();
    expect(component.cartItem).toEqual([{ id: 1 }, { id: 2 }]);
    component.deleteSelected();
    expect(toggle).toBe();
    expect(component.cartItem).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should be created deleteSelected and filter', () => {
    component.checked = [{ deleteId: 1 }, { deleteId: 2 }];
    let yFilter = component.checked.map((item: any) => {
      return item.deleteId;
    });
    component.cartItem = [{ id: 1 }, { id: 2 }];
    let filteredX = component.cartItem.map((itemX: any) => {
      yFilter.includes(itemX.id);
    });
    component.newArray = [];
    let xFilter = component.newArray.map((item: any) => {
      return item.id;
    });
    component.product = [{ deleteId: 1 }, { deleteId: 2 }];
    let zFilter = component.product.filter((item: any) => {
      xFilter.includes(item.deleteId);
    });
    fixture.detectChanges();
    component.deleteSelected();
    expect(yFilter).toEqual([1, 2]);
    expect(filteredX).toEqual([undefined, undefined]);
    expect(xFilter).toEqual([]);
    expect(zFilter).toEqual([]);
  });

  it('should be created key', () => {
    let item = {
      deleteId: 1000,
      quantity: 2,
      priceDto: { price: 100 },
      total: 150,
    };
    component.cartItem = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ];
    let event = { value: 0 };
    component.cartItem.map((a: any) => {
      item.deleteId = a.id;
    });
    let totalPrice = 33;
    const toggle = component.key(event, item, totalPrice);
    expect(toggle).toBe();
  });
  it('should be created deleteItem and map', async () => {
    let item = { id: 1, deleteId: 2 };
    component.cartItem = [{ id: 1 }, { id: 2 }];
    let filteredY = component.cartItem.map((itemX: any) => {
      item.deleteId = itemX.id;
    });
    component.product = [{ id: 1 }, { id: 2 }];
    let filteredX = component.product.map((a: any) => {
      item.id = a.id;
    });
    fixture.detectChanges();
    component.deleteItem(item);
    expect(filteredX).toEqual([undefined, undefined]);
    expect(filteredY).toEqual([undefined, undefined]);
  });
});
