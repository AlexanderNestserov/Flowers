import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';
import { ItemService } from '../home/items/item.service';
import { FilterModule } from '../filter/filter.module';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule,
  ],
  providers: [ItemService, SwiperListService],
})
export class SearchModule {}
