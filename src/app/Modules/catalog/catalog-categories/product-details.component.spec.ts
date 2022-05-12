import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
  });

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
      id: 1050,
      priceDto: { id: 1056 },
      quantity: 2,
      category: { name: 'Alex' },
    };
    const toggle = component.addToCart(item);
    expect(toggle).toBeUndefined();
  });
});
