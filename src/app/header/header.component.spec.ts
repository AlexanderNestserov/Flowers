import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    fixture.detectChanges();
    component.isShow = false;
    const foo = document.body.style.overflow;
    component.toggleDisplay();
    expect(foo).toEqual('hidden' || "");
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
    component.ngOnInit.bind(window.onload)
    expect(function onScroll() { }).toBeTruthy()
  });
})
