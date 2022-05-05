import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from '../home/items/item.service';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';
import { SearchPipe } from '../search/search.pipe';
import { FilterCheckboxPipe } from './catalog-items/checkbox.pipe';
import { CostPipe } from './catalog-items/cost.pipe';
import { FilterCategoryPipe } from './catalog-items/filter.pipe';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FilterComponent,
        CostPipe,
        FilterCheckboxPipe,
        FilterCategoryPipe,
        SearchPipe,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SwiperListService, ItemService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
