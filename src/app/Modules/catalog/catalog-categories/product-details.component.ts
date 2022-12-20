import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  AddItem,
  CreateCart,
  PriceChanges,
} from '../../cart-order/cart-order.config';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { Item } from '../../home/items/items.config';
import {
  LineStylesData,
  LINE_STYLES_DATA,
  Options,
  OPTIONS,
  ProductType,
  PRODUCT_TYPE,
} from './product.config';

import { Chart } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import gradient from 'chartjs-plugin-gradient';
import { Observable } from 'rxjs';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  itemId: number = this.route.snapshot.queryParams['id'];
  getPrice: Observable<PriceChanges[]> = this.cartService.getPriceChanges(
    this.itemId
  );
  elementId: string = '';
  cartItem: AddItem[] = [];
  product: Item[] = [];
  productType: ProductType = PRODUCT_TYPE;
  categoryName: string = '';
  isActive: boolean = false;
  id: number[] = [];

  lineStylesData: LineStylesData = LINE_STYLES_DATA;
  basicOptions: Options = OPTIONS;
  lineStylesDataSix: LineStylesData = LINE_STYLES_DATA;
  basicOptionsSix: Options = OPTIONS;
  priceChangesOfItem: number = 0;
  backendPriceChanges: number[] = [];
  changingPriceItem: number[] = [];
  changingDateItem: string[] = [];

  changingDateItemSixMonth: string[] = [];

  priceChangesIsShow = false;
  isShowActiveMonth = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    if (event) {
      document.body.style.overflow = 'scroll';
    }
  }

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.queryParams['categoryName'];
    this.itemId = this.route.snapshot.queryParams['id'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoryName = params['categoryName'];
      this.itemId = params['id'];
    });

    this.cartService.getProductDetails().subscribe({
      next: (res: Item[]) => {
        if (!res.length) {
          this.product.push(this.productType);
        } else {
          this.product = res;
          this.product = [this.product[this.product.length - 1]];
        }
      },
    });
    this.cartService.getShoppingCart().subscribe((res: CreateCart) => {
      res.orderItems.map((a: AddItem) => {
        this.id.push(a.itemId);
        this.changeDetector.detectChanges();
      });
    });
    Chart.register(ChartDataLabels);
    Chart.register(gradient);

    let backendChanges: Moment[] = [];
    let realChangesDateMoment: Moment;
    const nowMoment = moment();
    let momentoMoment = moment().subtract(1, 'month');
    let momentoSixMoment = moment().subtract(6, 'months');

    this.getPrice.subscribe((res: PriceChanges[]) => {
      res.map((res: PriceChanges) => {
        realChangesDateMoment = moment(new Date(res.date));
        backendChanges.push(realChangesDateMoment);
        this.priceChangesOfItem = res.price;
        this.backendPriceChanges.push(this.priceChangesOfItem);
      });

      if (momentoMoment >= realChangesDateMoment) {
        this.showChartChanges(momentoMoment, nowMoment);
      } else if (
        momentoMoment < realChangesDateMoment &&
        nowMoment >= realChangesDateMoment &&
        backendChanges[0] < momentoMoment
      ) {
        this.showChartChangesOneDay(momentoMoment, realChangesDateMoment);
        this.showChartChanges(realChangesDateMoment, nowMoment);
      } else {
        this.showChartChangesWithoutPrice(momentoMoment, backendChanges[0]);
        this.showChartChangesOneDay(backendChanges[0], realChangesDateMoment);
        this.showChartChanges(realChangesDateMoment, nowMoment);
      }

      if (momentoSixMoment >= realChangesDateMoment) {
        this.showChartChangesPrices(momentoSixMoment, nowMoment);
      } else if (
        momentoSixMoment < realChangesDateMoment &&
        nowMoment >= realChangesDateMoment &&
        backendChanges[0] < momentoSixMoment
      ) {
        this.showChartChangesPricesBackend(
          momentoSixMoment,
          realChangesDateMoment
        );
        this.showChartChangesPrices(realChangesDateMoment, nowMoment);
      } else {
        this.showChartChangesWithoutPriceMonth(
          momentoSixMoment,
          backendChanges[0]
        );
        this.showChartChangesPricesBackend(
          backendChanges[0],
          realChangesDateMoment
        );
        this.showChartChangesPrices(realChangesDateMoment, nowMoment);
      }
    });
  }

  showChartChanges(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'day')) {
      this.changingDateItem.push(a.format('DD.MM'));
      this.pushFromFormatPriceItem();
      a.add(5, 'days');
    }
  }

  showChartChangesPrices(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'month')) {
      this.changingDateItemSixMonth.push(a.format('MM.YY'));
      this.pushFromFormatPriceItem();
      a.add(1, 'month');
    }
  }

  showChartChangesOneDay(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'day')) {
      this.changingDateItem.push(a.format('DD.MM'));
      this.pushFromBackendChanges();
      a.add(1, 'days');
    }
  }

  showChartChangesPricesBackend(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'month')) {
      this.changingDateItemSixMonth.push(a.format('MM.YY'));
      this.pushFromBackendChanges();
      a.add(1, 'month');
    }
  }

  showChartChangesWithoutPrice(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'day')) {
      this.changingDateItem.push(a.format('DD.MM'));
      a.add(5, 'days');
    }
  }

  showChartChangesWithoutPriceMonth(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'month')) {
      this.changingDateItemSixMonth.push(a.format('MM.YY'));
      a.add(1, 'month');
    }
  }

  pushFromFormatPriceItem() {
    this.changingPriceItem.push(this.priceChangesOfItem);
  }

  pushFromBackendChanges() {
    this.changingPriceItem = this.backendPriceChanges;
  }

  getSecondElement(): void {
    this.isActive = true;
  }

  getFirstElement(): void {
    this.isActive = false;
  }

  isShowOneMonth(): void {
    this.isShowActiveMonth = false;
    this.priceChangesShow();
  }
  isShowSixMonth(): void {
    this.isShowActiveMonth = true;
    this.priceChangesShow();
  }

  priceChangesShow(): void {
    this.priceChangesIsShow = true;
    document.body.style.overflow = 'hidden';
    if (!this.isShowActiveMonth) {
      this.lineStylesData.labels = this.changingDateItem;
      this.lineStylesData.datasets[0].data = this.changingPriceItem;
    } else {
      this.lineStylesDataSix.labels = this.changingDateItemSixMonth;
      this.lineStylesDataSix.datasets[0].data = this.changingPriceItem;
    }
  }

  closePriseChanges(): void {
    this.priceChangesIsShow = false;
    document.body.style.overflow = 'scroll';
  }

  getPhoto(photo: string): string {
    return `${environment.serverUrl}images/${photo.replace('.jpg', '')}`;
  }

  addToCart(item: Item): void {
    let product: AddItem = {
      id: 0,
      itemId: item.id,
      priceId: item.priceDto.id,
      quantity: 1,
    };
    this.cartService.addItemToCart(product).subscribe({
      next: (res: CreateCart) => {
        this.cartItem = res.orderItems;
        this.cartService.productList.next(this.cartItem);
        this.cartItem.map((a: AddItem) => {
          this.id.push(a.itemId);
          this.changeDetector.detectChanges();
        });
      },
    });
  }
}
