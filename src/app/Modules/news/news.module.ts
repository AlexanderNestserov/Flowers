import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsRoutingModule } from './news-routing.module';
import { BannersModule } from '../banners/banners.module';

import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from '../../../environments/environment';

@NgModule({
  declarations: [
    NewsComponent

  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgxPaginationModule,
    BannersModule,
    HttpClientModule
  ],
  providers: [NewsService,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ]
})
export class NewsModule { }
