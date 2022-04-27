import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: any[], value: any) {
    if (!items || value == null) {
      return items;
    } else if (value.name == 'By cost (descending)') {
      return items.sort((a, b) => {
        return b.priceDto.price - a.priceDto.price;
      });
    } else if (value.name == 'By cost (ascending)') {
      return items.sort((a, b) => {
        return a.priceDto.price - b.priceDto.price;
      });
    } else if (value.name == 'By name (A - Z)') {
      return items.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else {
      return items.sort((a, b) => {
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
