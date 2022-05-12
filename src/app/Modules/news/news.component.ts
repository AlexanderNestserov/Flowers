import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  newsData: Observable<any> = this.api.getNews();
  p: number = 1;

  constructor(private api: NewsService) {}
}
