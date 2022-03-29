import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { RegistrationComponent } from '../Modules/registration/registration.component';
import { routes } from '../app.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, RegistrationComponent],
      imports: [RouterTestingModule.withRoutes(routes), RouterModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
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
  it('should be created toggleDisplay run', () => {
    const link = fixture.debugElement.query(By.css('.burger'));
    link.nativeElement.click();
    expect(component.toggleDisplay).toBeTruthy()
  });
  it('should be created toggleDisplay else', () => {
    component.isShow = !component.isShow;
    const foo = document.body.style.overflow;
    component.toggleDisplay();
    fixture.detectChanges();
    expect(foo).toEqual('hidden' || '');
  });
  it('should be created toggleDisplays if', () => {
    const spy = spyOn(component, 'toggleDisplay');
    component.isShow = false;
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
    let scroll = component.ngOnInit.bind(onscroll)
    expect(scroll).toBeTruthy()
  });
  it('should be created onScroll function', () => {
    window.dispatchEvent(new Event("scroll"));
    window.scrollTo(0, 50);
    let sticky = window.pageYOffset = 0;
    fixture.detectChanges();
    expect(sticky).toBe(0);
  });
  it('should be created onScroll function', () => {
    const link = fixture.debugElement.query(By.css('header.scroll'));
    expect(link).toBeNull()
  });
  it('should be created onScroll function', async () => {
    const link = fixture.debugElement.query(By.css('header.scroll'));
    window.dispatchEvent(new Event("scroll"));
    window.scrollTo(5, 50);
    window.pageYOffset = 5;
    fixture.detectChanges();
    component.ngOnInit();
    expect(link).toBeNull();
  })

})
