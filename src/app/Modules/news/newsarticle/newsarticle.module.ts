import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsarticleRoutingModule } from './newsarticle-routing.module';
import { BannersModule } from '../../banners/banners.module';
import { NewsarticleComponent } from './newsarticle.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from '../../../../environments/environment';
import { NewsArticleService } from './newsarticle.service';

@NgModule({
  declarations: [
    NewsarticleComponent
  ],
  imports: [
    CommonModule,
    NewsarticleRoutingModule,
    BannersModule,
    HttpClientModule
  ],
  providers: [NewsArticleService,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ]
})
export class NewsarticleModule { }
