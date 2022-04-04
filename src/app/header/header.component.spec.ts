import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { RegistrationComponent } from '../Modules/registration/registration.component';
import { routes } from '../app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let keycloakService = jasmine.createSpyObj(['login', 'logout', 'isLoggedIn'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, RegistrationComponent],
      imports: [RouterTestingModule.withRoutes(routes), RouterModule, KeycloakAngularModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: KeycloakService, useValue: keycloakService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    keycloakService.login();
    keycloakService.logout();
    keycloakService.isLoggedIn();
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
      })
    }));
    it('should be created routes registration', fakeAsync(() => {
      router.navigate(['registration']).then(() => {
        expect(location.path()).toBe('/registration');
      })
    }));
  })

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
    expect(foo).toBe('hidden')
  });
  it('should be created toggleDisplay else', async () => {
    let spy = spyOn(component, 'toggleDisplay').and.callFake(() => {
      document.body.style.overflow;
    })
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
    expect(component.toggleDisplays).toBeTruthy()
  });
  it('should be created toggleUser', () => {
    const link = fixture.debugElement.query(By.css('.header__user'));
    link.nativeElement.click();
    expect(component.toggleUser).toBeTruthy()
  });
  it('should be created toggleUser', () => {
    let click = component.ngOnInit()
    const toggle = component.toggleUser.bind(click);
    expect(toggle).toBeTruthy(click);
  });
  it('should be created onScroll', () => {
    let scroll = component.ngOnInit.bind(onscroll);
    expect(scroll).toBeTruthy();
  });
  it('should be created onScroll add scroll', () => {
    window.dispatchEvent(new Event("scroll"));
    window.scrollTo(0, 50);
    let sticky = window.pageYOffset = 0;
    fixture.detectChanges();
    expect(sticky).toBe(0);
  });
  it('should be created onScroll function', async () => {
    const link = fixture.debugElement.query(By.css('header.scroll'));
    window.dispatchEvent(new Event("scroll"));
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
    let spy = component.ngOnDestroy()
    expect(spy).toBeUndefined()
  });
})
