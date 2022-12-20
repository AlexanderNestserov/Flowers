import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Routes } from '@angular/router';
import { AccountComponent } from './Modules/account/account.component';
import { CartOrderComponent } from './Modules/cart-order/cart-order.component';
import { CatalogComponent } from './Modules/catalog/catalog.component';
import { HomeComponent } from './Modules/home/home.component';
import { MyordersComponent } from './Modules/myorders/myorders.component';
import { NewsComponent } from './Modules/news/news.component';
import { RegistrationComponent } from './Modules/registration/registration.component';
import { SearchComponent } from './Modules/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'myorders', component: MyordersComponent },
  { path: 'account', component: AccountComponent },
  { path: 'news', component: NewsComponent },
  { path: 'cartorder', component: CartOrderComponent },
  { path: 'search', component: SearchComponent },
];
