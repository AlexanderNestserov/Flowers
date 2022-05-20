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
  cartItem: AddItem[] = [];
  product: Item[] = [];
  productType: ProductType = PRODUCT_TYPE;
  categoryName: string = '';
  isActive: boolean = false;
  id: number[] = [];

  lineStylesData: LineStylesData = LINE_STYLES_DATA;
  basicOptions: Options = OPTIONS;
  priceChangesOfItem: number = 0;
  addingZeroDate: number = 10;
  addingZeroMonth: number = 9;
  changingPriceItem: number[] = [];
  changingDateItem: string[] = [];

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

    this.getPrice.subscribe((res: PriceChanges[]) => {
      res.map((res: PriceChanges) => {
        let realChangesDate = new Date(res.date);
        let realGetDate = realChangesDate.getDate().toString();
        let realGetMonth = realChangesDate.getMonth().toString();
        let realChanges;
        if (+realGetDate < this.addingZeroDate) {
          realGetDate = '0' + realGetDate;
        } else if (+realGetMonth < this.addingZeroMonth) {
          realGetMonth = '0' + (+realGetMonth + 1);
        }
        realChanges = realGetDate + '.' + realGetMonth;
        this.changingDateItem.push(realChanges);
        this.priceChangesOfItem = res.price;
        this.changingPriceItem.push(this.priceChangesOfItem);
      });
    });
  }

  getSecondElement(): void {
    this.isActive = true;
  }

  getFirstElement(): void {
    this.isActive = false;
  }

  isShowMonth(): void {
    this.isShowActiveMonth = !this.isShowActiveMonth;
  }

  priceChangesShow(): void {
    this.priceChangesIsShow = true;
    document.body.style.overflow = 'hidden';
    this.lineStylesData.labels = this.changingDateItem;
    this.lineStylesData.datasets[0].data = this.changingPriceItem;
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
