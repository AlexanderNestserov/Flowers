import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  categoriesFilterName: string = '';
  categoriesFilterId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.categoriesFilterId = this.route.snapshot.queryParams['id'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoriesFilterName = params['name'];
      this.categoriesFilterId = params['id'];
      this.changeDetector.detectChanges();
    });
  }
}
