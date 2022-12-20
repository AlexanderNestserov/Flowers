import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesSort } from '../../catalog/catalog-categories/product.config';
import { Item } from '../../home/items/items.config';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: Item[], value: CategoriesSort) {
    if (!items || !value) {
      return items;
    } else if (value.name == 'By cost (descending)') {
      return items.sort((a: Item, b: Item) => {
        return b.priceDto.price - a.priceDto.price;
      });
    } else if (value.name == 'By cost (ascending)') {
      return items.sort((a: Item, b: Item) => {
        return a.priceDto.price - b.priceDto.price;
      });
    } else if (value.name == 'By name (A - Z)') {
      return items.sort((a: Item, b: Item) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else {
      return items.sort((a: Item, b: Item) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
  }
}
