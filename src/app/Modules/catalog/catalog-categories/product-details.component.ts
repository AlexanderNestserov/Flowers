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
        realChangesDateMoment = moment(res.date);
        backendChanges.push(realChangesDateMoment);
        this.priceChangesOfItem = res.price;
      });

      if (momentoMoment >= realChangesDateMoment) {
        this.showChartChanges(momentoMoment, nowMoment);
        /*  while (momentoMoment.isSameOrBefore(nowMoment, 'day')) {
          this.changingDateItem.push(momentoMoment.format('DD.MM'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          momentoMoment.add(5, 'days');
        }*/
      } else if (
        momentoMoment < realChangesDateMoment &&
        nowMoment >= realChangesDateMoment &&
        backendChanges[0] < momentoMoment
      ) {
        this.showChartChangesOneDay(momentoMoment, realChangesDateMoment);
        /* while (momentoMoment.isSameOrBefore(realChangesDateMoment, 'day')) {
          this.changingDateItem.push(momentoMoment.format('DD.MM'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          momentoMoment.add(1, 'days');
        }*/
        this.showChartChanges(realChangesDateMoment, nowMoment);
        /* while (realChangesDateMoment.isSameOrBefore(nowMoment, 'day')) {
          this.changingDateItem.push(realChangesDateMoment.format('DD.MM'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          realChangesDateMoment.add(5, 'days');
        }*/
      } else {
        this.showChartChangesWithoutPrice(momentoMoment, backendChanges[0]);
        /* while (momentoMoment.isSameOrBefore(backendChanges[0], 'day')) {
          this.changingDateItem.push(momentoMoment.format('DD.MM'));
          momentoMoment.add(5, 'days');
        }*/
        this.showChartChangesOneDay(backendChanges[0], realChangesDateMoment);
        /* while (backendChanges[0].isSameOrBefore(realChangesDateMoment, 'day')) {
          this.changingDateItem.push(backendChanges[0].format('DD.MM'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          backendChanges[0].add(1, 'days');
        }*/
        this.showChartChanges(realChangesDateMoment, nowMoment);
        /*while (realChangesDateMoment.isSameOrBefore(nowMoment, 'day')) {
          this.changingDateItem.push(realChangesDateMoment.format('DD.MM'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          realChangesDateMoment.add(5, 'days');
        }*/
      }
      if (momentoSixMoment >= realChangesDateMoment) {
        // this.showChartChanges(momentoSixMoment, nowMoment);
        while (momentoSixMoment.isSameOrBefore(nowMoment, 'month')) {
          this.changingDateItemSixMonth.push(momentoSixMoment.format('MM.YY'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          momentoSixMoment.add(1, 'month');
        }
      } else if (
        momentoSixMoment < realChangesDateMoment &&
        nowMoment >= realChangesDateMoment &&
        backendChanges[0] < momentoSixMoment
      ) {
        // this.showChartChanges(momentoSixMoment, realChangesDateMoment);
        while (
          momentoSixMoment.isSameOrBefore(realChangesDateMoment, 'month')
        ) {
          this.changingDateItemSixMonth.push(momentoSixMoment.format('MM.YY'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          momentoSixMoment.add(1, 'month');
        }
        // this.showChartChanges(realChangesDateMoment, nowMoment);
        while (realChangesDateMoment.isSameOrBefore(nowMoment, 'month')) {
          this.changingDateItemSixMonth.push(
            realChangesDateMoment.format('MM.YY')
          );
          this.changingPriceItem.push(this.priceChangesOfItem);
          realChangesDateMoment.add(1, 'month');
        }
      } else {
        // this.showChartChangesWithoutPrice(momentoSixMoment, backendChanges[0]);
        while (momentoSixMoment.isSameOrBefore(backendChanges[0], 'month')) {
          this.changingDateItemSixMonth.push(momentoSixMoment.format('MM.YY'));
          momentoSixMoment.add(1, 'month');
        }
        //this.showChartChanges(backendChanges[0], realChangesDateMoment);
        while (
          backendChanges[0].isSameOrBefore(realChangesDateMoment, 'month')
        ) {
          this.changingDateItemSixMonth.push(backendChanges[0].format('MM.YY'));
          this.changingPriceItem.push(this.priceChangesOfItem);
          backendChanges[0].add(1, 'month');
        }
        //this.showChartChanges(realChangesDateMoment, nowMoment);
        while (realChangesDateMoment.isSameOrBefore(nowMoment, 'month')) {
          this.changingDateItemSixMonth.push(
            realChangesDateMoment.format('MM.YY')
          );
          this.changingPriceItem.push(this.priceChangesOfItem);
          realChangesDateMoment.add(1, 'month');
        }
      }
    });
  }

  showChartChanges(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, this.isShowActiveMonth ? 'month' : 'day')) {
      (this.isShowActiveMonth
        ? this.changingDateItemSixMonth
        : this.changingDateItem
      ).push(a.format(this.isShowActiveMonth ? 'MM.YY' : 'DD.MM'));
      this.pushFromFormatPriceItem();
      a.add(
        this.isShowActiveMonth ? 1 : 5,
        this.isShowActiveMonth ? 'month' : 'days'
      );
    }
  }

  showChartChangesWithoutPrice(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, this.isShowActiveMonth ? 'month' : 'day')) {
      (this.isShowActiveMonth
        ? this.changingDateItemSixMonth
        : this.changingDateItem
      ).push(a.format(this.isShowActiveMonth ? 'MM.YY' : 'DD.MM'));
      a.add(
        this.isShowActiveMonth ? 1 : 5,
        this.isShowActiveMonth ? 'month' : 'days'
      );
    }
  }

  showChartChangesOneDay(a: Moment, b: Moment) {
    while (a.isSameOrBefore(b, 'day')) {
      (this.isShowActiveMonth
        ? this.changingDateItemSixMonth
        : this.changingDateItem
      ).push(a.format(this.isShowActiveMonth ? 'MM.YY' : 'DD.MM'));
      this.pushFromFormatPriceItem();
      a.add(1, 'days');
    }
  }

  pushFromFormat(a: Moment, c: string[]) {
    c.push(a.format(this.isShowActiveMonth ? 'MM.YY' : 'DD.MM'));
  }

  pushFromFormatPriceItem() {
    this.changingPriceItem.push(this.priceChangesOfItem);
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
    this.lineStylesData.labels = [];
    this.lineStylesData.datasets[0].data = [];
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
