import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { filter, fromEvent, Observable, Subscription } from 'rxjs';
import {
  NavigationEnd,
  Router,
  RouterEvent,
  Event as RouterEventTarget,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { CartOrderService } from '../Modules/cart-order/cart-order.service';
import { AddItem, CreateCart } from '../Modules/cart-order/cart-order.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:click)': 'onClick()',
  },
})
export class HeaderComponent implements OnInit {
  obs!: Subscription;
  isMenu = true;
  isShow = true;
  isShown = false;
  urlCatalog = false;
  urlRegistration = false;
  urlNewsArticle = false;
  urlCartOrder = false;
  urlAccount = false;
  urlMyorders = false;
  public isLoggedIn = false;

  productList: Observable<AddItem[]> = this.cartService.productList;

  quantityItems: number = 0;

  keycloakLogoutOption = environment.keycloakLogoutOption;

  constructor(
    public router: Router,
    public readonly keycloak: KeycloakService,
    private cartService: CartOrderService,
    private changeDetector: ChangeDetectorRef
  ) {
    router.events
      .pipe(
        filter(
          (e: RouterEventTarget): e is NavigationEnd =>
            e instanceof NavigationEnd
        )
      )
      .subscribe((e: RouterEvent) => {
        if (e.url === '/myorders') {
          this.urlMyorders = true;
        } else {
          this.urlMyorders = false;
        }
        if (e.url === '/account') {
          this.urlAccount = true;
        } else {
          this.urlAccount = false;
        }
        if (e.url === '/registration') {
          this.urlRegistration = true;
        } else {
          this.urlRegistration = false;
        }
        if (e.url.split('/')[1] === 'news') {
          this.urlNewsArticle = true;
        } else {
          this.urlNewsArticle = false;
        }
        if (e.url.split('/')[1].split('?')[0] === 'catalog') {
          this.urlCatalog = true;
        } else {
          this.urlCatalog = false;
        }
        if (e.url === '/cartorder') {
          this.urlCartOrder = true;
        } else {
          this.urlCartOrder = false;
        }
      });
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    let onScroll = () => {
      this.obs = fromEvent(window, 'scroll').subscribe(callbackFunction);
      function callbackFunction() {
        let y = window.pageYOffset;
        if (y > 0) {
          document.querySelector('.header')?.classList.add('scroll');
        } else {
          document.querySelector('.header')?.classList.remove('scroll');
        }
      }
    };
    onScroll();

    this.cartService.getShoppingCart().subscribe((res: CreateCart) => {
      this.quantityItems = res.orderItems.length;
    });
    this.productList.subscribe((res: AddItem[]) => {
      this.quantityItems = res.length;
      this.changeDetector.detectChanges();
    });
  }

  toggleDisplay(): void {
    this.isShow = !this.isShow;
    this.isShown = !this.isShown;
    if (!this.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }

  toggleDisplays(): void {
    if (!this.isShow) {
      this.toggleDisplay();
    }
  }

  toggleUser(event: Event): void {
    event.stopPropagation();
    this.isMenu = !this.isMenu;
  }

  onClick(): void {
    this.isMenu = true;
  }

  public logout(): void {
    if (this.isLoggedIn) {
      this.keycloak.logout(this.keycloakLogoutOption);
    }
  }

  ngOnDestroy(): void {
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }
}
