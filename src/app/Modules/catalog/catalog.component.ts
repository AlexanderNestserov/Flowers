import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  rangeValues: number[] = [0, 300];
  selectedCities: string[] = [];

  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{ name: 'Fresh flowers', key: 'F' },
  { name: 'Indoor plants', key: 'I' },
  { name: 'Planting material', key: 'P' },
  { name: 'Floral accessories', key: 'A' },
  { name: 'Landscape design', key: 'L' }];

  checked: boolean = false;
  items: MenuItem[] = [];
  value6: any;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.selectedCategories = this.categories.slice(1, 3);

    this.items = [
      {
        label: 'Fresh flowers'
      },
      {
        label: 'Indoor plants'
      },
      { label: 'Planting material' },
      { label: 'Floral accessories' },
      { label: 'Landscape design' }
    ];
  }
}
