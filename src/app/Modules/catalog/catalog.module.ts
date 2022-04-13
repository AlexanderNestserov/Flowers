import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CatalogComponent } from './catalog.component';
import { HomeModule } from '../home/home.module';
import { SwiperModule } from 'swiper/angular';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BannersModule } from '../banners/banners.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { CatalogItemsComponent } from './catalog-items/catalog-items.component';
<<<<<<< HEAD
=======
import { ItemService } from '../home/items/item.service';

>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogItemsComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    HomeModule,
    SwiperModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    CheckboxModule,
    ButtonModule,
    SplitButtonModule,
    BannersModule,
    DropdownModule,
    NgxPaginationModule,
  ],
  exports: [
    CatalogItemsComponent,
  ],
  providers: [ItemService]
})
export class CatalogModule { }
