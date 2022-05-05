import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsComponent } from './product-details.component';
import { CatalogModule } from '../catalog.module';
import { BannersModule } from '../../banners/banners.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../home/items/item.service';
import { CartOrderService } from '../../cart-order/cart-order.service';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    BannersModule,
    ProductDetailsRoutingModule,
    CatalogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ItemService],
})
export class ProductDetailsModule {}
