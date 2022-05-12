import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ItemService } from '../home/items/item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public searchValue: string = '';

  constructor(private search: ItemService) {}

  searchItem(event: any): void {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.search.searching.next(this.searchValue);
  }
}
