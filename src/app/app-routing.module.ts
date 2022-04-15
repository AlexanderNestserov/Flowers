import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./Modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'catalog/:name',
    loadChildren: () =>
      import(
        './Modules/catalog/catalog-categories/product-details.module'
      ).then((m) => m.ProductDetailsModule),
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./Modules/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./Modules/aboutus/aboutus.module').then((m) => m.AboutusModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./Modules/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'news/:id',
    loadChildren: () =>
      import('./Modules/news/newsarticle/newsarticle.module').then(
        (m) => m.NewsarticleModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./Modules/contacts/contacts.module').then(
        (m) => m.ContactsModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./Modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'cartorder',
    loadChildren: () =>
      import('./Modules/cart-order/cart-order.module').then(
        (m) => m.CartOrderModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./Modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./Modules/account/account.module').then((m) => m.AccountModule),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
