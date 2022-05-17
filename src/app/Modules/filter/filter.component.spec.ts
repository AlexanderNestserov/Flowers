import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.component';
import { ItemService } from '../home/items/item.service';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';
import { SearchPipe } from '../search/search.pipe';
import { FilterCheckboxPipe } from './catalog-items/checkbox.pipe';
import { CostPipe } from './catalog-items/cost.pipe';
import { FilterCategoryPipe } from './catalog-items/filter.pipe';
import { Location } from '@angular/common';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterComponent,
        CostPipe,
        FilterCheckboxPipe,
        FilterCategoryPipe,
        SearchPipe,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        RouterModule,
      ],
      providers: [SwiperListService, ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('routes', () => {
    let location: Location;
    let router: Router;
    beforeEach(() => {
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      router.initialNavigation();
      fixture.detectChanges();
    });
    it('should be created routes ', fakeAsync(() => {
      router.navigate(['catalog']).then(() => {
        expect(location.path()).toBe('/catalog');
      });
    }));
    it('should be created routes ', fakeAsync(() => {
      router.navigate(['search']).then(() => {
        expect(location.path()).toBe('/search');
      });
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created filterCategoriesButton', () => {
    const toggle = component.filterCategoriesButton();
    expect(toggle).toBeUndefined();
  });
  it('should be created filterCategoriesButton', () => {
    component.searchInput = 'Text';
    component.filterCategoriesButton();
    expect(component.searchInput).toBeTruthy();
  });
  it('should be created sortingCategoriesButton', () => {
    const toggle = component.sortingCategoriesButton();
    expect(toggle).toBeUndefined();
  });
  it('should be created clearFilter', () => {
    component.clearFilter();
    expect(component.checked).toEqual([]);
  });
  it('should be created handle', () => {
    const toggle = component.handle();
    expect(toggle).toBeUndefined();
  });
  it('should be created filterDisplay', () => {
    component.isFilterShow = true;
    component.filterDisplay();
    expect(component.isFilterShow).toBe(false);
  });
  it('should be created filterDisplay', () => {
    component.isFilterShow = false;
    component.filterDisplay();
    expect(component.isFilterShow).toBe(true);
  });
  it('should be created sortingDisplay', () => {
    component.isSortingShow = false;
    component.sortingDisplay();
    expect(component.isSortingShow).toBe(true);
  });
  it('should be created sortingDisplay', () => {
    component.isSortingShow = true;
    component.sortingDisplay();
    expect(component.isSortingShow).toBe(false);
  });
});
