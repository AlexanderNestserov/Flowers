import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { AccountService } from '../account/account.service';
import { ItemService } from '../home/items/item.service';
import { Item } from '../home/items/items.config';
import { CartOrderErrorFormModule } from './cart-order-error-form/cart-order-error-form.module';

import { CartOrderComponent } from './cart-order.component';
import { AddItem } from './cart-order.config';
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
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
              return of({ id: 1, homeAddress: '1' });
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
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('items manipulation', () => {
    let item: Item;
    beforeEach(() => {
      item = {
        category: {
          description: '',
          id: 0,
          name: '',
          photo: '',
          thumbnail: '',
        },
        description: '',
        id: 0,
        name: '',
        photo: '',
        priceDto: {
          date: '',
          id: 0,
          itemId: 0,
          price: 0,
        },
        promotion: {
          id: 0,
          itemId: 0,
          promotion: 0,
        },
        shortDescription: '',
        thumbnail: '',
        quantity: 0,
        total: 0,
        deleteId: 1000,
      };
      component.cartItem = [
        { id: 1, itemId: 1, priceId: 1, quantity: 1 },
        { id: 2, itemId: 2, priceId: 2, quantity: 1 },
      ];
      component.checked = [
        {
          category: {
            description: '',
            id: 0,
            name: '',
            photo: '',
            thumbnail: '',
          },
          description: '',
          id: 1,
          name: '',
          photo: '',
          priceDto: {
            date: '',
            id: 0,
            itemId: 0,
            price: 0,
          },
          promotion: {
            id: 0,
            itemId: 0,
            promotion: 0,
          },
          shortDescription: '',
          thumbnail: '',
          quantity: 0,
          total: 0,
          deleteId: 1000,
        },
        {
          category: {
            description: '',
            id: 0,
            name: '',
            photo: '',
            thumbnail: '',
          },
          description: '',
          id: 2,
          name: '',
          photo: '',
          priceDto: {
            date: '',
            id: 0,
            itemId: 0,
            price: 0,
          },
          promotion: {
            id: 0,
            itemId: 0,
            promotion: 0,
          },
          shortDescription: '',
          thumbnail: '',
          quantity: 0,
          total: 0,
          deleteId: 1000,
        },
      ];
      component.product = [
        {
          category: {
            description: '',
            id: 0,
            name: '',
            photo: '',
            thumbnail: '',
          },
          description: '',
          id: 1,
          name: '',
          photo: '',
          priceDto: {
            date: '',
            id: 0,
            itemId: 0,
            price: 0,
          },
          promotion: {
            id: 0,
            itemId: 0,
            promotion: 0,
          },
          shortDescription: '',
          thumbnail: '',
          quantity: 0,
          total: 0,
          deleteId: 1000,
        },
        {
          category: {
            description: '',
            id: 0,
            name: '',
            photo: '',
            thumbnail: '',
          },
          description: '',
          id: 2,
          name: '',
          photo: '',
          priceDto: {
            date: '',
            id: 0,
            itemId: 0,
            price: 0,
          },
          promotion: {
            id: 0,
            itemId: 0,
            promotion: 0,
          },
          shortDescription: '',
          thumbnail: '',
          quantity: 0,
          total: 0,
          deleteId: 1000,
        },
      ];
      fixture.detectChanges();
    });
    it('should be created deleteItem', () => {
      const toggle = component.deleteItem(item);
      expect(toggle).toBe();
    });
    it('should be created deleteSelected and filter', () => {
      const toggle = component.deleteSelected();
      expect(component.cartItem).toEqual([
        { id: 1, itemId: 1, priceId: 1, quantity: 1 },
        { id: 2, itemId: 2, priceId: 2, quantity: 1 },
      ]);
      component.deleteSelected();
      expect(toggle).toBe();
      expect(component.cartItem).toEqual([
        { id: 1, itemId: 1, priceId: 1, quantity: 1 },
        { id: 2, itemId: 2, priceId: 2, quantity: 1 },
      ]);
    });
    it('should be created deleteSelected and filter', () => {
      let yFilter = component.checked.map((item: Item) => {
        return item.deleteId;
      });
      let filteredX = component.cartItem.map((itemX: AddItem) => {
        yFilter.includes(itemX.id);
      });
      component.deleteSelectedItems = [];
      let xFilter = component.deleteSelectedItems.map((item: AddItem) => {
        return item.id;
      });
      let zFilter = component.product.filter((item: Item) => {
        xFilter.includes(item.deleteId!);
      });
      fixture.detectChanges();
      component.deleteSelected();
      expect(yFilter).toEqual([1000, 1000]);
      expect(filteredX).toEqual([undefined, undefined]);
      expect(xFilter).toEqual([]);
      expect(zFilter).toEqual([]);
    });
    it('should be created key', () => {
      let event = { value: 0 };
      component.cartItem.map((a: AddItem) => {
        item.deleteId = a.id;
      });
      let totalPrice = 33;
      const toggle = component.key(event, item, totalPrice);
      expect(toggle).toBe();
    });
    it('should be created deleteItem and map', async () => {
      let filteredY = component.cartItem.map((itemX: any) => {
        item.deleteId = itemX.id;
      });
      let filteredX = component.product.map((a: any) => {
        item.id = a.id;
      });
      fixture.detectChanges();
      component.deleteItem(item);
      expect(filteredX).toEqual([undefined, undefined]);
      expect(filteredY).toEqual([undefined, undefined]);
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update the control with homeAddress', () => {
    const el = fixture.debugElement.query(By.css(' #inputAddress'));
    const ctrl = component.formValue.get('homeAddress');
    const dValue = 'Alex';
    ctrl?.setValue(dValue);
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual(dValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dValue);
  });
  it('should update the control with homeAddress', () => {
    const ctrl = component.formValue.get('homeAddress');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeFalsy();
  });
  it('should be created homeAddress', () => {
    const ctrl = component.formValue.get('homeAddress');
    ctrl?.setValue('Alex');
    const result = component.homeAddress.value;
    expect(result).toEqual('Alex');
  });
  it('should be created additionalInformation', () => {
    const ctrl = component.formValue.get('additionalInformation');
    ctrl?.setValue('Alex');
    const result = component.additionalInformation.value;
    expect(result).toEqual('Alex');
  });
  it('should be created text', () => {
    const ctrl = component.formValue.get('text');
    ctrl?.setValue('Alex');
    const result = component.text.value;
    expect(result).toEqual('Alex');
  });
  it('should update the control with paymentType', () => {
    const cash = fixture.debugElement.query(By.css(' #cash'))
      .nativeElement as HTMLInputElement;
    const card = fixture.debugElement.query(By.css(' #card'))
      .nativeElement as HTMLInputElement;
    const ctrl = component.formValue.get('paymentType');
    const dValue = 'CASH';
    ctrl?.setValue(dValue);
    fixture.detectChanges();
    expect(cash.checked).toBeTruthy();
    expect(card.checked).toBeFalsy();
  });
  it('should be created text', () => {
    const ctrl = component.formValue.get('paymentType');
    ctrl?.setValue('CASH');
    const result = component.paymentType.value;
    expect(result).toEqual('CASH');
  });
  it('should be created postDataDetails', () => {
    const toggle = component.postDataDetails();
    expect(toggle).toBeUndefined();
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
});
