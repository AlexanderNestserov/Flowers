import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from './item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartOrderService } from '../../cart-order/cart-order.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [CartOrderService, ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

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
    let item = { itemId: 2, name: 'Alex' };
    const toggle = component.addToProduct(item);
    expect(toggle).toBeUndefined();
  });
  it('should be created addToCart', () => {
    let item = {
      id: 1050,
      priceDto: { id: 1056 },
      quantity: 2,
      name: 'Alex',
    };
    const toggle = component.addToCart(item);
    expect(toggle).toBeUndefined();
  });
});
