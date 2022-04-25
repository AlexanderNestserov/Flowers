import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsComponent } from './product-details.component';
import { CatalogModule } from '../catalog.module';
import { BannersModule } from '../../banners/banners.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../home/items/item.service';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    BannersModule,
    ProductDetailsRoutingModule,
    CatalogModule,
    FormsModule,
    ReactiveFormsModule,
    BannersModule,
  ],
  providers: [ItemService],
})
export class ProductDetailsModule {}
