import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ItemService } from '../../home/items/item.service';
import { Item } from '../../home/items/items.config';
import { SearchPipe } from '../../search/search.pipe';

import { CatalogItemsComponent } from './catalog-items.component';
import { FilterCheckboxPipe } from './checkbox.pipe';
import { CostPipe } from './cost.pipe';
import { FilterCategoryPipe } from './filter.pipe';
import { SortPipe } from './sorting.pipe';

describe('CatalogItemsComponent', () => {
  let component: CatalogItemsComponent;
  let fixture: ComponentFixture<CatalogItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
  }));

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
  it('should be created getItemImage', () => {
    let item = 'photo.jpg';
    const toggle = component.getItemImage(item);
    expect(toggle).toBe('http://172.16.16.41:15000/images/photo');
  });
  it('should be created addToProducts', () => {
    let item = {
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
      quantity: 1,
    };
    const toggle = component.addToProducts(item);
    expect(toggle).toBeUndefined();
  });
});
describe('create Pipes', () => {
  let cost = new CostPipe();
  let filterCategoryPipe = new FilterCategoryPipe();
  let filterCheckboxPipe = new FilterCheckboxPipe();
  let sortPipe = new SortPipe();
  let items: Item[] = [
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Alex',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Alex',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 10,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Bob',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Bob',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 15,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'John',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'John',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 20,
      },
    },
  ];
  let costItem = [
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Alex',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Alex',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 10,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Alex',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Alex',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 10,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'John',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'John',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 20,
      },
    },
  ];
  let variableItem = [
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Bob',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Bob',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 15,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'Alex',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'Alex',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 10,
      },
    },
    {
      category: {
        description:
          'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
        id: 1050,
        name: 'John',
        photo: '"fresh-flowers-photo.jpg"',
        thumbnail: 'images/categories/Flowers-thumbnail',
      },
      description:
        'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
      id: 1056,
      name: 'John',
      photo: 'flower-7-photo.jpg',
      priceDto: {
        date: '2021-08-10 14:10',
        id: 1056,
        itemId: 1056,
        price: 20,
      },
    },
  ];
  it('cost pipe', () => {
    let value = [14, 21];
    expect(cost.transform(items, value)).toEqual([items[1], items[2]]);
  });
  it('filterCategoryPipe pipe', () => {
    let valueFilter = 'Bob';
    expect(filterCategoryPipe.transform(items, valueFilter)).toEqual([
      items[1],
    ]);
  });
  it('filterCheckboxPipe pipe', () => {
    let valueFilter = ['Bob', 'John'];
    expect(filterCheckboxPipe.transform(items, valueFilter)).toEqual([
      items[1],
      items[2],
    ]);
  });
  it('sortPipe ascending pipe', () => {
    let valueFilter = { name: 'By cost (ascending)', key: 1 };
    expect(sortPipe.transform(items, valueFilter)).toEqual(items);
  });
  it('sortPipe descending pipe', () => {
    let valueFilter = { name: 'By cost (descending)', key: 2 };
    expect(sortPipe.transform(items, valueFilter)).toEqual(items.reverse());
  });
  it('sortPipe By name (A - Z) 1 pipe', () => {
    let valueFilter = { name: 'By name (A - Z)', key: 3 };
    expect(sortPipe.transform([items[3], items[2]], valueFilter)).toEqual([
      items[2],
      items[3],
    ]);
  });
  it('sortPipe By name (A - Z) -1  pipe', () => {
    let valueFilter = { name: 'By name (A - Z)', key: 3 };
    expect(sortPipe.transform(items, valueFilter)).toEqual(items);
  });
  it('sortPipe By name (A - Z) 0  pipe', () => {
    let valueFilter = { name: 'By name (A - Z)', key: 3 };
    expect(sortPipe.transform(costItem, valueFilter)).toEqual(costItem);
  });
  it('sortPipe By name (Z - A) -1 pipe', () => {
    let valueFilter = { name: 'By name (Z - A)', key: 4 };
    expect(sortPipe.transform(items, valueFilter)).toEqual(items.reverse());
  });
  it('sortPipe By name (Z - A) 1 pipe', () => {
    let valueFilter = { name: 'By name (Z - A)', key: 4 };
    expect(sortPipe.transform(variableItem, valueFilter)).toEqual([
      variableItem[0],
      variableItem[1],
      variableItem[2],
    ]);
  });
  it('sortPipe By name (Z - A) 0 pipe', () => {
    let valueFilter = { name: 'By name (Z - A)', key: 4 };
    expect(sortPipe.transform(costItem, valueFilter)).toEqual(
      costItem.reverse()
    );
  });
});
