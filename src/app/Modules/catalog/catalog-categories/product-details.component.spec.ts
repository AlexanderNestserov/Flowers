import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

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
    component.ngOnInit();
    expect(component.product.length - 1).toEqual(item.length);
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
});
