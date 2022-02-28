import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsarticleRoutingModule } from './newsarticle-routing.module';

import { NewsarticleComponent } from './newsarticle.component';

@NgModule({
  declarations: [
    NewsarticleComponent
  ],
  imports: [
    CommonModule,
    NewsarticleRoutingModule
  ]
})
export class NewsarticleModule { }
