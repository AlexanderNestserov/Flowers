import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsRoutingModule } from './news-routing.module';
import { BannersModule } from '../banners/banners.module';

import { NewsComponent } from './news.component';
import { NewsService } from './news.service';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgxPaginationModule,
    BannersModule,
  ],
  providers: [NewsService],
})
export class NewsModule {}
