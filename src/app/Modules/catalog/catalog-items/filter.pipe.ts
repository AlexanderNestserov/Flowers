import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterCategoryPipe implements PipeTransform {
  transform(items: any[], value: string) {
    if (!items || !value) {
      return items;
    } else {
      return items.filter((item: any) => {
        return item.category.name.includes(value);
      });
    }
  }
}
