import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: any[], value: any) {
    if (!items || value == null) {
      return items;
    } else if (value.name == 'Max Price') {
      return items.sort((a, b) => {
        return b.priceDto.price - a.priceDto.price;
      });
    } else if (value.name == 'Min Price') {
      return items.sort((a, b) => {
        return a.priceDto.price - b.priceDto.price;
      });
    } else {
      return items.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
  }
}
