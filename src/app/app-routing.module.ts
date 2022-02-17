import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) }, { path: 'aboutus', loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutusModule) }, { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) }, { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
