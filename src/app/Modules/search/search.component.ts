import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ItemService } from '../home/items/item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public searchValue: string = '';

  constructor(private search: ItemService) {}

  ngOnInit(): void {}

  searchItem(event: any) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.search.searching.next(this.searchValue);
  }
}
