import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from '../home/items/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchPipe } from './search.pipe';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchPipe],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created searchItem', () => {
    let event = { target: { value: 'A' } };
    const result = component.searchItem(event);
    expect(result).toBeUndefined();
  });
});
describe('create Pipes', () => {
  let search = new SearchPipe();

  it('search pipe', () => {
    let items = [{ name: 'ALEX' }, { name: 'BOB' }, { name: 'JOHN' }];
    let value = 'alex';
    expect(search.transform(items, value)).toEqual([{ name: 'ALEX' }]);
  });
});
