import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CatalogComponent } from './catalog.component';
import { HomeModule } from '../home/home.module';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannersModule } from '../banners/banners.module';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    HomeModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    BannersModule,
    FilterModule,
  ],
  exports: [],
  providers: [],
})
export class CatalogModule {}
