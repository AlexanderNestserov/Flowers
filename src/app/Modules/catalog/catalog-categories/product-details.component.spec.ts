import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let service: CartOrderService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        CommonModule,
      ],
      providers: [ItemService, CartOrderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CartOrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created getFirstElement', () => {
    component.isActive;
    component.getFirstElement();
    expect(component.isActive).toBe(false);
  });
  it('should be created getSecondElement', () => {
    component.isActive;
    component.getSecondElement();
    expect(component.isActive).toBe(true);
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getPhoto(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should be created addToCart', () => {
    let item = {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Fresh flowers',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'LEMON AND LIME',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 86.99,
      },
      promotion: {
        id: 1056,
        itemId: 1056,
        promotion: 70,
      },
      shortDescription: 'This bouquet is the epitome of affordable luxury',
      thumbnail: 'flower-7-thumbnail.jpg',
      quantity: 2,
    };
    const toggle = component.addToCart(item);
    expect(toggle).toBeUndefined();
  });
  it('should be created product length', () => {
    let item = [
      {
        category: {
          description:
            'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
          id: 1050,
          name: 'Fresh flowers',
          photo: '"fresh-flowers-photo.jpg"',
          thumbnail: 'images/categories/Flowers-thumbnail',
        },
        description:
          'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
        id: 1056,
        name: 'LEMON AND LIME',
        photo: 'flower-7-photo.jpg',
        priceDto: {
          date: '2021-08-10 14:10',
          id: 1056,
          itemId: 1056,
          price: 86.99,
        },
        promotion: {
          id: 1056,
          itemId: 1056,
          promotion: 70,
        },
        shortDescription: 'This bouquet is the epitome of affordable luxury',
        thumbnail: 'flower-7-thumbnail.jpg',
      },
    ];
    const spy = spyOn(service, 'getProductDetails').and.callFake(() => {
      return from([item]);
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should be created priceChangesShow', () => {
    component.priceChangesIsShow;
    component.priceChangesShow();
    expect(component.priceChangesIsShow).toBe(true);
  });
  it('should be created closePriseChanges', () => {
    component.priceChangesIsShow;
    component.closePriseChanges();
    expect(component.priceChangesIsShow).toBe(false);
  });
  it('should be created priceChangesShow', () => {
    component.isShowActiveMonth = false;
    component.isShowMonth();
    expect(component.isShowActiveMonth).toBe(true);
  });
  it('should create an instance popstateListener', () => {
    const event = new PopStateEvent('$event');
    component.onPopState(event);
    expect(document.body.style.overflow).toEqual('scroll');
  });
  it('should be created realGEtDate', () => {
    let real = '5';
    let addingZero = 10;
    if (+real < addingZero) {
      real = '0' + real;
    }
    component.ngOnInit();
    expect(real).toEqual('05');
  });
  it('should be created getShoppingCart', () => {
    let item = {
      id: 1,
      orderItems: [
        {
          id: 1,
          itemId: 100,
          priceId: 100,
          quantity: 2,
        },
      ],
      text: '',
    };
    const spy = spyOn(service, 'getShoppingCart').and.callFake(() => {
      return from([item]);
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should be created addItemtoCArt', () => {
    let item = {
      id: 1,
      orderItems: [
        {
          id: 1,
          itemId: 100,
          priceId: 100,
          quantity: 2,
        },
      ],
      text: '',
    };
    let items = {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Fresh flowers',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'LEMON AND LIME',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 86.99,
      },
      promotion: {
        id: 1056,
        itemId: 1056,
        promotion: 70,
      },
      shortDescription: 'This bouquet is the epitome of affordable luxury',
      thumbnail: 'flower-7-thumbnail.jpg',
      quantity: 2,
    };
    const spy = spyOn(service, 'addItemToCart').and.callFake(() => {
      return from([item]);
    });
    component.addToCart(items);
    expect(spy).toHaveBeenCalled();
  });
});
