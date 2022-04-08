import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'search'
})
export class ItemFilterPipe implements PipeTransform {
    transform(items: any[], searchText: any): any {
        //if (!items) return items;
        // if (!searchText) return items;



        // return items.filter(it => {
        //     return it.name.includes(searchText);
        //  });
    }
}