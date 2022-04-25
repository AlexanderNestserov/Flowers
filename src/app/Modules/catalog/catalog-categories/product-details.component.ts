import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartOrderService } from '../../cart-order/cart-order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  cartItem: any;
  product: any = [];
  categoryName: string = '';
  isActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartOrderService
  ) {}
  ngOnInit() {
    this.categoryName = this.route.snapshot.queryParams['categoryName'];

    this.route.queryParams.subscribe((params: Params) => {
      this.categoryName = params['categoryName'];
    });

    this.cartService.getProductDetails().subscribe((res) => {
      this.product = res;
      this.product = [this.product[this.product.length - 1]];
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
    item.total = item.quantity * item.priceDto.price;
    this.cartService.addToCart(item);
    this.cartItem = item;
  }
}
