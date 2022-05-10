import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddItem } from '../../cart-order/cart-order.config';
import { CartOrderService } from '../../cart-order/cart-order.service';
import { ProductType, PRODUCT_TYPE } from './product.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  cartItem: any;
  product: any = [];
  productType: ProductType = PRODUCT_TYPE;

  categoryName: string = '';
  isActive: boolean = false;
  id: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.categoryName = this.route.snapshot.queryParams['categoryName'];
    this.route.queryParams.subscribe((params: Params) => {
      this.categoryName = params['categoryName'];
    });

    this.cartService.getProductDetails().subscribe({
      next: (res) => {
        if (res.length == 0) {
          this.product.push(this.productType);
        } else {
          this.product = res;
          this.product = [this.product[this.product.length - 1]];
        }
      },
      error: () => {},
    });
    this.cartService.getShoppingCart().subscribe((res) => {
      res.orderItems.map((a: any) => {
        this.id.push(a.itemId);
        this.changeDetector.detectChanges();
      });
    });
  }

  getSecondElement() {
    this.isActive = true;
  }
  getFirstElement() {
    this.isActive = false;
  }

  getPhoto(photo: string): string {
    return `${environment.serverUrl}images/${photo.replace('.jpg', '')}`;
  }

  addToCart(item: any) {
    item.quantity = 1;
    let product: AddItem = {
      id: 0,
      itemId: item.id,
      priceId: item.priceDto.id,
      quantity: item.quantity,
    };
    this.cartService.addItemToCart(product).subscribe({
      next: (res) => {
        this.cartItem = res.orderItems;
        this.cartService.productList.next(this.cartItem);
        this.cartItem.map((a: any) => {
          this.id.push(a.itemId);
          this.changeDetector.detectChanges();
        });
      },
      error: () => {},
    });
  }
}
