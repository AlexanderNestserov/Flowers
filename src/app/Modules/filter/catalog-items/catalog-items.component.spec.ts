import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';
import { SearchPipe } from '../../search/search.pipe';

import { CatalogItemsComponent } from './catalog-items.component';
import { FilterCheckboxPipe } from './checkbox.pipe';
import { CostPipe } from './cost.pipe';
import { FilterCategoryPipe } from './filter.pipe';
import { SortPipe } from './sorting.pipe';

describe('CatalogItemsComponent', () => {
  let component: CatalogItemsComponent;
  let fixture: ComponentFixture<CatalogItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CatalogItemsComponent,
        FilterCategoryPipe,
        FilterCheckboxPipe,
        SortPipe,
        CostPipe,
        SearchPipe,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
      ],
      providers: [ItemService, CartOrderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created addToCart', () => {
    let item = {
      id: 1050,
      priceDto: { id: 1056 },
      quantity: 2,
    };
    const toggle = component.addToCart(item);
    expect(toggle).toBe();
  });
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should be created addToProducts', () => {
    let item = { itemId: 2 };
    const toggle = component.addToProducts(item);
    expect(toggle).toBe();
  });
});
describe('create Pipes', () => {
  let cost = new CostPipe();
  let filterCategoryPipe = new FilterCategoryPipe();
  let filterCheckboxPipe = new FilterCheckboxPipe();
  let sortPipe = new SortPipe();
  it('cost pipe', () => {
    let items = [
      { priceDto: { price: 10 } },
      { priceDto: { price: 15 } },
      { priceDto: { price: 20 } },
    ];
    let value = [14, 21];
    expect(cost.transform(items, value)).toEqual([
      { priceDto: { price: 15 } },
      { priceDto: { price: 20 } },
    ]);
  });
  it('filterCategoryPipe pipe', () => {
    let itemsFilter = [
      { category: { name: 'Alex' } },
      { category: { name: 'Bob' } },
      { category: { name: 'John' } },
    ];
    let valueFilter = 'Bob';
    expect(filterCategoryPipe.transform(itemsFilter, valueFilter)).toEqual([
      { category: { name: 'Bob' } },
    ]);
  });
  it('filterCheckboxPipe pipe', () => {
    let itemsFilter = [
      { category: { name: 'Alex' } },
      { category: { name: 'Bob' } },
      { category: { name: 'John' } },
    ];
    let valueFilter = ['Bob', 'John'];
    expect(filterCheckboxPipe.transform(itemsFilter, valueFilter)).toEqual([
      { category: { name: 'Bob' } },
      { category: { name: 'John' } },
    ]);
  });
  it('sortPipe ascending pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By cost (ascending)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ]);
  });
  it('sortPipe descending pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By cost (descending)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 20 }, name: 'John' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 10 }, name: 'Alex' },
    ]);
  });
  it('sortPipe By name (A - Z) 1 pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (A - Z)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ]);
  });
  it('sortPipe By name (A - Z) -1  pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (A - Z)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ]);
  });
  it('sortPipe By name (A - Z) 0  pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (A - Z)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 20 }, name: 'John' },
    ]);
  });
  it('sortPipe By name (Z - A) -1 pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (Z - A)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 20 }, name: 'John' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 10 }, name: 'Alex' },
    ]);
  });
  it('sortPipe By name (Z - A) 1 pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 10 }, name: 'Alex' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (Z - A)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 20 }, name: 'John' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 10 }, name: 'Alex' },
    ]);
  });
  it('sortPipe By name (Z - A) 0 pipe', () => {
    let itemsFilter = [
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 20 }, name: 'John' },
    ];
    let valueFilter = { name: 'By name (Z - A)' };
    expect(sortPipe.transform(itemsFilter, valueFilter)).toEqual([
      { priceDto: { price: 20 }, name: 'John' },
      { priceDto: { price: 15 }, name: 'Bob' },
      { priceDto: { price: 15 }, name: 'Bob' },
    ]);
  });
});
