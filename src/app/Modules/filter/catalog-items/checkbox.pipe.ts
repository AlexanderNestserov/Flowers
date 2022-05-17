import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../home/items/items.config';

@Pipe({
  name: 'checkbox',
})
export class FilterCheckboxPipe implements PipeTransform {
  transform(items: Item[], value: string[]) {
    if (!items || !value.length) {
      return items;
    } else {
      let yFilter = value.map((item: string) => {
        return item;
      });
      let filteredX = items.filter((itemX: Item) =>
        yFilter.includes(itemX.category.name)
      );
      return filteredX;
    }
  }
}
