import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newsarticle',
  templateUrl: './newsarticle.component.html',
  styleUrls: ['./newsarticle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsarticleComponent implements OnInit {
  text: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.text = this.route.snapshot.queryParams['text'];
  }
}

