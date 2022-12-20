import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../home/items/items.config';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Item[], value: string) {
    if (!items || !value) {
      return items;
    } else {
      return items.filter((item: Item) => {
        return item.name.includes(value.toUpperCase());
      });
    }
  }
}
