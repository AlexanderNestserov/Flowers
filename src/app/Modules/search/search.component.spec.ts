import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from '../home/items/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPipe } from './search.pipe';
import { Item } from '../home/items/items.config';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchPipe],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created searchItem', () => {
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
    const result = component.searchItem(event);
    expect(result).toBeUndefined();
  });
});
describe('create Pipes', () => {
  let search = new SearchPipe();

  it('search pipe', () => {
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
    let value = 'Alex';
    expect(search.transform(items, value)).toEqual([]);
  });
});
