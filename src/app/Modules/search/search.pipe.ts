import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], value: string) {
    if (!items || !value) {
      return items;
    } else {
      return items.filter((item: any) => {
        return item.name.includes(value.toUpperCase());
      });
    }
  }
}
