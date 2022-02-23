import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsarticleComponent } from './newsarticle/newsarticle.component';



@NgModule({
  declarations: [
    NewsComponent,
    NewsarticleComponent,


  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgxPaginationModule
  ],
  providers: []
})
export class NewsModule { }
