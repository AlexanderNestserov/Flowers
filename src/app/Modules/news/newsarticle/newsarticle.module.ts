import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsarticleRoutingModule } from './newsarticle-routing.module';
import { BannersModule } from '../../banners/banners.module';
import { NewsarticleComponent } from './newsarticle.component';
import { HttpClientModule } from '@angular/common/http';

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
  providers: []
})
export class NewsarticleModule { }
