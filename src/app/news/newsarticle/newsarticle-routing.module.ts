import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsarticleComponent } from './newsarticle.component';

const routes: Routes = [{ path: '', component: NewsarticleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsarticleRoutingModule { }
