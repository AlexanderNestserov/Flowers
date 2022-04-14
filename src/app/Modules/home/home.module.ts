import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SwiperModule } from 'swiper/angular';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { BannersModule } from '../banners/banners.module';

import { SliderLogoComponent } from './slider-logo/slider-logo.component';
import { SwiperLogoComponent } from './swiper-logo/swiper-logo.component';
import { SwiperListComponent } from './swiper-list/swiper-list.component';
import { ItemsComponent } from './items/items.component';
import { SwiperListService } from './swiper-list/swiper-list.service';
import { ItemService } from './items/item.service';

@NgModule({
  declarations: [
    HomeComponent,
    SliderLogoComponent,
    SwiperLogoComponent,
    SwiperListComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    BannersModule,
    FormsModule,
  ],
  exports: [SwiperListComponent],
  providers: [SwiperListService, ItemService],
})
export class HomeModule {}
