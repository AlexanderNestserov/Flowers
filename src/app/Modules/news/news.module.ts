import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsRoutingModule } from './news-routing.module';
import { BannersModule } from '../banners/banners.module';

import { NewsComponent } from './news.component';
import { NewsService } from './news.service';


@NgModule({
  declarations: [
    NewsComponent

  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgxPaginationModule,
<<<<<<< HEAD
    BannersModule
  ],
  providers: [NewsService]
=======
    BannersModule,
  ],
  providers: [NewsService,
  ]
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
})
export class NewsModule { }
