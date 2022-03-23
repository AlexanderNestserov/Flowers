import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  newsData: Observable<any> = this.api.getNews();
  p: number = 1;
  collection: {
    id: number,
    date: string,
    title: string,
    text: string
  }[] = [];
  item;
  constructor(private api: NewsService) {
    this.item = {
      id: 1,
      date: 'June 25, 2021',
      title: 'Flower delivery in Minsk',
      text: 'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.'
    }
  }
  ngOnInit(): void {
    // for (let i = 0; i < 60; i++) {
    //  const item = Object.assign({}, this.item);
    //  item.id = item.id + i;
    //   this.collection.push(item);
  }
}
