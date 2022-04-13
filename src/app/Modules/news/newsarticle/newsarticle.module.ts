import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsarticleRoutingModule } from './newsarticle-routing.module';
import { BannersModule } from '../../banners/banners.module';
import { NewsarticleComponent } from './newsarticle.component';

@NgModule({
  declarations: [
    NewsarticleComponent
  ],
  imports: [
    CommonModule,
    NewsarticleRoutingModule,
<<<<<<< HEAD
    BannersModule
=======
    BannersModule,
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
  ],
  providers: []
})
export class NewsarticleModule { }
