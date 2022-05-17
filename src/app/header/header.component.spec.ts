import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { RegistrationComponent } from '../Modules/registration/registration.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { CartOrderService } from '../Modules/cart-order/cart-order.service';
import { routes } from '../app.component';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let productList: BehaviorSubject<any>;
  let keycloakService = jasmine.createSpyObj(['login', 'logout', 'isLoggedIn']);
  let MockCartOrderService = jasmine.createSpyObj('fakeCartOrderService', [
    'getShoppingCart',
    'createCart',
    'addItemToCart',
    'updateCart',
    'deleteItem',
    'getProductDetails',
    'addToProductDetails',
    'productList',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, RegistrationComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        RouterModule,
        KeycloakAngularModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: KeycloakService, useValue: keycloakService },
        {
          provide: CartOrderService,
          useClass: class MockCartOrderService {
            getShoppingCart(): Observable<any> {
              return of({ orderItems: [{ id: 1 }] });
            }
            createCart(): Observable<any> {
              return of({});
            }
            addItemToCart(product: any): Observable<any> {
              return of({});
            }
            updateCart(product: any): Observable<any> {
              return of({});
            }
            deleteItem(id: number): Observable<any> {
              return of({});
            }
            getProductDetails() {
              return of({});
            }
            addToProductDetails() {
              return of({});
            }
            productList = new BehaviorSubject([{ id: 1 }, { id: 2 }]);
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    keycloakService.login();
    keycloakService.logout();
    keycloakService.isLoggedIn();
    productList = new BehaviorSubject([{ id: 1 }, { id: 2 }]);
    fixture.detectChanges();
  });

  describe('routes', () => {
    let location: Location;
    let router: Router;
    beforeEach(() => {
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      router.initialNavigation();
      fixture.detectChanges();
    });
    it('should be created routes ', fakeAsync(() => {
      router.navigate(['']).then(() => {
        expect(location.path()).toBe('/home');
      });
    }));
    it('should be created routes registration', fakeAsync(() => {
      router.navigate(['registration']).then(() => {
        expect(location.path()).toBe('/registration');
      });
    }));
    it('should be created routes myorders', fakeAsync(() => {
      router.navigate(['myorders']).then(() => {
        expect(location.path()).toBe('/myorders');
      });
    }));
    it('should be created routes catalog', fakeAsync(() => {
      router.navigate(['catalog']).then(() => {
        expect(location.path()).toBe('/catalog');
      });
    }));
    it('should be created routes account', fakeAsync(() => {
      router.navigate(['account']).then(() => {
        expect(location.path()).toBe('/account');
      });
    }));
    it('should be created routes news', fakeAsync(() => {
      router.navigate(['news']).then(() => {
        expect(location.path()).toBe('/news');
      });
    }));
    it('should be created routes cartorder', fakeAsync(() => {
      router.navigate(['cartorder']).then(() => {
        expect(location.path()).toBe('/cartorder');
      });
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created toggleDisplay', () => {
    const toggle = component.toggleDisplay();
    expect(toggle).toBe();
  });
  it('should be created toggleDisplay run', async () => {
    const link = fixture.debugElement.query(By.css('.burger'));
    link.nativeElement.click();
    component.isShow = false;
    const foo = document.body.style.overflow;
    fixture.detectChanges();
    component.toggleDisplay();
    expect(foo).toBe('hidden');
  });
  it('should be created toggleDisplay else', async () => {
    let spy = spyOn(component, 'toggleDisplay').and.callFake(() => {
      document.body.style.overflow;
    });
    component.isShow = true;
    fixture.detectChanges();
    component.toggleDisplay();
    expect(spy).toHaveBeenCalled();
  });
  it('should be created toggleDisplays if', () => {
    const spy = spyOn(component, 'toggleDisplay');
    component.isShow = false;
    fixture.detectChanges();
    component.toggleDisplays();
    expect(spy).toHaveBeenCalled();
  });
  it('should be created toggleDisplays run', () => {
    const link = fixture.debugElement.query(By.css('.header__search'));
    link.nativeElement.click();
    expect(component.toggleDisplays).toBeTruthy();
  });
  it('should be created toggleUser', () => {
    const link = fixture.debugElement.query(By.css('.header__user'));
    link.nativeElement.click();
    expect(component.toggleUser).toBeTruthy();
  });
  it('should be created toggleUser', () => {
    let click = component.ngOnInit();
    const toggle = component.toggleUser.bind(click);
    expect(toggle).toBeTruthy(click);
  });
  it('should be created onScroll', () => {
    let scroll = component.ngOnInit.bind(onscroll);
    expect(scroll).toBeTruthy();
  });
  it('should be created onScroll add scroll', () => {
    window.dispatchEvent(new Event('scroll'));
    window.scrollTo(0, 50);
    let sticky = (window.pageYOffset = 0);
    fixture.detectChanges();
    expect(sticky).toBe(0);
  });
  it('should be created onScroll function', async () => {
    const link = fixture.debugElement.query(By.css('header.scroll'));
    window.dispatchEvent(new Event('scroll'));
    window.scrollTo(5, 50);
    window.pageYOffset = 5;
    fixture.detectChanges();
    component.ngOnInit();
    expect(link).toBeNull();
  });
  it('should be created logout', fakeAsync(() => {
    component.logout();
    expect(keycloakService.logout).toHaveBeenCalled();
  }));
  it('should be created logout', fakeAsync(() => {
    component.isLoggedIn = true;
    component.logout();
    expect(keycloakService.logout).toHaveBeenCalled();
  }));
  it('should be created ngOnDestroy', () => {
    let spy = component.ngOnDestroy();
    expect(spy).toBeUndefined();
  });

  it('should return productList subscribe', () => {
    productList.next([{ id: 3 }]);
    expect(component).toBeTruthy();
  });
});
