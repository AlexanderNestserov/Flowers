import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../home/items/items.config';

@Pipe({
  name: 'cost',
})
export class CostPipe implements PipeTransform {
  transform(items: Item[], value: number[]) {
    if (!items || !value.length) {
      return items;
    } else {
      return items.filter((item: Item) => {
        return (
          item.priceDto.price >= value[0] && item.priceDto.price <= value[1]
        );
      });
    }
  }
}
