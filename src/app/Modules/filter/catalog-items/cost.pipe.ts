import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost',
})
export class CostPipe implements PipeTransform {
  transform(items: any[], value: number[]) {
    if (!items || value.length == 0) {
      return items;
    } else {
      return items.filter((item: any) => {
        return (
          item.priceDto.price >= value[0] && item.priceDto.price <= value[1]
        );
      });
    }
  }
}
