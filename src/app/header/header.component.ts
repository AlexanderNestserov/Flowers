import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { filter, fromEvent, map, Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { CartOrderService } from '../Modules/cart-order/cart-order.service';

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
  quantityItem = this.cartService.productList;

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
  public isLoggedIn: any;

  quantityItems: Observable<any> = this.cartService.getShoppingCart();

  keycloakLogoutOption = environment.keycloakLogoutOption;

  constructor(
    public router: Router,
    public readonly keycloak: KeycloakService,
    private cartService: CartOrderService
  ) {
    this.router.events
      .pipe(filter((e: any) => e instanceof NavigationEnd))
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

  ngOnInit(): void {
    this.isLoggedIn = this.keycloak.isLoggedIn();

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

    this.quantityItem.subscribe((res) => {
      console.log(res.length);

      this.quantityItem = res.length;
    });
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.isShown = !this.isShown;
    if (!this.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }

  toggleDisplays() {
    if (!this.isShow) {
      this.toggleDisplay();
    }
  }

  toggleUser(event: Event) {
    event.stopPropagation();
    this.isMenu = !this.isMenu;
  }

  onClick() {
    this.isMenu = true;
  }

  public logout() {
    if (this.isLoggedIn) {
      this.keycloak.logout(this.keycloakLogoutOption);
    }
  }

  ngOnDestroy() {
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }
}
