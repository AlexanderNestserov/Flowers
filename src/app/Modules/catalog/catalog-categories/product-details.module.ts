import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ProductDetailsComponent } from './product-details.component';
import { CatalogModule } from '../catalog.module';
import { BannersModule } from '../../banners/banners.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { HomeModule } from '../../home/home.module';
import { SwiperModule } from 'swiper/angular';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,

    BannersModule,
    ProductDetailsRoutingModule,
    HomeModule,
    CatalogModule,
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
    NgxPaginationModule
  ]
})
export class ProductDetailsModule { }
