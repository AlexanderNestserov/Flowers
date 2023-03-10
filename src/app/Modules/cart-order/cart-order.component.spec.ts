import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { ClickedDivState } from '../account/account.component';
import { AccountService } from '../account/account.service';
import { ItemService } from '../home/items/item.service';
import { Item } from '../home/items/items.config';
import { CartOrderErrorFormModule } from './cart-order-error-form/cart-order-error-form.module';

import { CartOrderComponent } from './cart-order.component';
import {
  AddItem,
  CreateCart,
  GetAllOrders,
  OrderCheckout,
  StripePostOrders,
} from './cart-order.config';
import { CartOrderService } from './cart-order.service';

describe('CartOrderComponent', () => {
  let component: CartOrderComponent;
  let fixture: ComponentFixture<CartOrderComponent>;
  let hostElement: DebugElement;
  let accountService = AccountService;
  let itemService = ItemService;
  let cartOrderService = CartOrderService;
  let MockAccountService = jasmine.createSpyObj('fakeAccountService', [
    'getUserData',
    'patchData',
    'postChangePassword',
    'mapAddress',
    'addressHTML',
    'address',
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
    'productOrderList',
    'postOrder',
    'getOrders',
    'postPaymentCharge',
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
        BrowserAnimationsModule,
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
        { provide: KeycloakService, useValue: KeycloakService },
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(): Observable<any> {
              return of({});
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
            mapAddress = new BehaviorSubject('Minsk');
            addressHTML = new BehaviorSubject<ElementRef>({} as ElementRef);
            address = new BehaviorSubject<string>('Brest');
          },
        },
        {
          provide: ItemService,
          useClass: class MockItemService {
            getItems(): Observable<any> {
              return of({ content: [{ id: 1 }] });
            }
            getItem(id: number) {
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
    hostElement = fixture.debugElement.query(By.css('#inputAddress'));
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
  it('should be created paymentType', () => {
    const ctrl = component.formValue.get('paymentType');
    ctrl?.setValue('CASH');
    const result = component.paymentType.value;
    expect(result).toEqual('CASH');
  });
  it('should be created postDataDetails', () => {
    component.isDisabled = false;
    component.postDataDetails();
    expect(component.isDisabled).toBe(false);
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should create an searchMapAdress', () => {
    let event: KeyboardEvent = {
      target: { value: 'A' } as HTMLInputElement,
      altKey: false,
      charCode: 0,
      code: '',
      ctrlKey: false,
      isComposing: false,
      key: '',
      keyCode: 0,
      location: 0,
      metaKey: false,
      repeat: false,
      shiftKey: false,
      getModifierState: function (keyArg: string): boolean {
        throw new Error('Function not implemented.');
      },
      initKeyboardEvent: function (
        typeArg: string,
        bubblesArg?: boolean,
        cancelableArg?: boolean,
        viewArg?: Window | null,
        keyArg?: string,
        locationArg?: number,
        ctrlKey?: boolean,
        altKey?: boolean,
        shiftKey?: boolean,
        metaKey?: boolean
      ): void {
        throw new Error('Function not implemented.');
      },
      DOM_KEY_LOCATION_LEFT: 0,
      DOM_KEY_LOCATION_NUMPAD: 0,
      DOM_KEY_LOCATION_RIGHT: 0,
      DOM_KEY_LOCATION_STANDARD: 0,
      detail: 0,
      view: null,
      which: 0,
      initUIEvent: function (
        typeArg: string,
        bubblesArg?: boolean,
        cancelableArg?: boolean,
        viewArg?: Window | null,
        detailArg?: number
      ): void {
        throw new Error('Function not implemented.');
      },
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (
        type: string,
        bubbles?: boolean,
        cancelable?: boolean
      ): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0,
    };
    const result = component.searchMapAdress(event);
    expect(result).toBeUndefined();
  });
  it('should be created postDataDetails', () => {
    const result = component.postDataDetails();
    expect(result).toBeUndefined();
  });
  it('should be created postDataDetails', () => {
    component['cartService'].postOrder = () => throwError({ error: true });
    component.postDataDetails();
    expect(component.clickedDivStateError).toEqual(ClickedDivState.hide);
  });
  it('should be created closePopup', () => {
    component.clickedDivState = ClickedDivState.show;
    component.closePopup();
    expect(component.clickedDivState).toEqual(ClickedDivState.hide);
  });
  it('should be created stripePaymentGateway', () => {
    const result = component.stripePaymentGateway();
    expect(result).toBeUndefined();
  });
});
