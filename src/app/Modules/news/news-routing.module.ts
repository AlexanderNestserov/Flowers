import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsarticleComponent } from './newsarticle/newsarticle.component'

const routes: Routes = [{ path: '', component: NewsComponent }, { path: 'newsarticle', component: NewsarticleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }