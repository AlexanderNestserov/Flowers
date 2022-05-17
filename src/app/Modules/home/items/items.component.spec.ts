import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemsComponent } from './items.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from './item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartOrderService } from '../../cart-order/cart-order.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [CartOrderService, ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should be created addToProducts', () => {
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
    const toggle = component.addToProduct(item);
    expect(toggle).toBeUndefined();
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
});
