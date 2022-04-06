import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

interface City {
  name: string,
  code: string
}

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

  cities: City[] = [];


  categories: any[] = [{ name: 'Fresh flowers', key: 'F' },
  { name: 'Indoor plants', key: 'I' },
  { name: 'Planting material', key: 'P' },
  { name: 'Floral accessories', key: 'A' },
  { name: 'Landscape design', key: 'L' }];

  checked: boolean = false;

  value6: any;
  constructor(private messageService: MessageService) { }

  ngOnInit() {



    this.cities = [
      { name: 'Fresh flowers', code: 'F' },
      { name: 'Indoor plants', code: 'I' },
      { name: 'Planting material', code: 'P' },
      { name: 'Floral accessories', code: 'A' },
      { name: 'Landscape design', code: 'L' }
    ];
  }
}
