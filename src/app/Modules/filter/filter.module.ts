import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
import { FilterCategoryPipe } from './catalog-items/filter.pipe';
import { ItemService } from '../home/items/item.service';
import { SearchPipe } from '../search/search.pipe';

@NgModule({
  declarations: [
    FilterComponent,
    CatalogItemsComponent,
    FilterCategoryPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    CheckboxModule,
    ButtonModule,
    SplitButtonModule,
    DropdownModule,
    NgxPaginationModule,
  ],
  exports: [FilterComponent],
  providers: [ItemService],
})
export class FilterModule {}
