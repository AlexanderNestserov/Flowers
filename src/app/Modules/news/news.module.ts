import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsRoutingModule } from './news-routing.module';
import { BannersModule } from '../banners/banners.module';

import { NewsComponent } from './news.component';
import { NewsarticleComponent } from './newsarticle/newsarticle.component';
import { BannersComponent } from '../banners/banners.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsarticleComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgxPaginationModule,
    BannersModule
  ]
})
export class NewsModule { }
