
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  p: number = 1;
  collection: any[] = [];
  item;
  constructor() {
    this.item = {
      id: 1,
      date: '25.06.2021',
      title: 'Flower delivery in Minsk',
      text: 'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.'
    }
  }
  ngOnInit(): void {
    for (let i = 0; i < 60; i++) {
      const item = Object.assign({}, this.item);
      item.id = item.id + i;
      this.collection.push(item);
    }
  }
}