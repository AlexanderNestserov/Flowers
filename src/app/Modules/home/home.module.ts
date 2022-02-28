import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SwiperModule } from 'swiper/angular';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { SliderLogoComponent } from './slider-logo/slider-logo.component';
import { SwiperLogoComponent } from './swiper-logo/swiper-logo.component'

@NgModule({
  declarations: [
    HomeComponent,
    SliderLogoComponent,
    SwiperLogoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    TabViewModule
  ]
})
export class HomeModule { }
