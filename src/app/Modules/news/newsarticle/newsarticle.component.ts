import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewsArticleService } from './newsarticle.service';

@Component({
  selector: 'app-newsarticle',
  templateUrl: './newsarticle.component.html',
  styleUrls: ['./newsarticle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsarticleComponent implements OnInit {

  newsData: Observable<any> = this.api.getNews();
  text: any;

  constructor(private api: NewsArticleService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.text = this.route.snapshot.queryParams['text'];
  }

}

