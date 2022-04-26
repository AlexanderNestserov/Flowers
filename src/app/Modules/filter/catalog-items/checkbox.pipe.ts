import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkbox',
})
export class FilterCheckboxPipe implements PipeTransform {
  transform(items: any[], value: any) {
    if (!items || value.length == 0) {
      return items;
    } else {
      let yFilter = value.map((item: any) => {
        return item;
      });
      let filteredX = items.filter((itemX) =>
        yFilter.includes(itemX.category.name)
      );
      return filteredX;
    }
  }
}
