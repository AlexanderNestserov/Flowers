import { Component } from '@angular/core';
import { ITEMS } from './items.config'

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  items: any[] = ITEMS;
}
