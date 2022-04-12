import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogCategoriesComponent } from './catalog-categories.component';


const routes: Routes = [{ path: '', component: CatalogCategoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogCategoriesRoutingModule { }
