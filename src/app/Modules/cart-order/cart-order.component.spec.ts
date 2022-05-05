import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Observable, of } from 'rxjs';
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
              return of({});
            }
            getProductDetails() {
              return of({});
            }
            addToProductDetails() {
              return of({});
            }
          },
        },
        { provide: KeycloakService, useValue: KeycloakService },
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(formValue: any): Observable<any> {
              return of({});
            }
            patchData() {
              return of({});
            }
            postChangePassword(formChangePassword: any) {
              return of({});
            }
            getTempId(): Observable<any> {
              return of({});
            }
          },
        },
        {
          provide: ItemService,
          useClass: class MockItemService {
            getItems(): Observable<any> {
              return of({});
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
    let item = null;
    const toggle = component.deleteItem(item);
    expect(toggle).toBeFalsy();
  });
  it('should be created deleteSelected', () => {
    const toggle = component.deleteSelected();
    expect(toggle).toBe();
  });
});
