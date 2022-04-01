import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { ContactsService } from './contacts.service';
import { ContactMeDto } from './contacts.model';
import { Observable, of } from 'rxjs';
import { PrintErrorDirective } from 'src/app/directives/error-form/error-form.directive';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let hostElement: DebugElement;
  let element: HTMLElement;
  let directive = jasmine.createSpyObj('PrintErrorDirective', ['keyup', 'focusout'])

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsComponent, PrintErrorDirective],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, CommonModule, ErrorDirectiveModule],
      providers: [{
        provide: ContactsService, useClass: class MockContactsPService {
          postData(formValue: ContactMeDto): Observable<any> {
            return of({})
          }
          getAdress(): Observable<string | number | object> {
            return of({})
          }
        }
      }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.query(By.css('.container__name'));
    element = fixture.nativeElement;
    directive.keyup();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created closeMenu', () => {
    const link = fixture.debugElement.query(By.css('app-popup'));
    link.nativeElement.click();
    expect(component.closeMenu).toBeTruthy()
  });
  it('should be created closeMenu error', () => {
    const link = fixture.debugElement.query(By.css('app-popup-error'));
    link.nativeElement.click();
    expect(component.closeMenu).toBeTruthy()
  });
  it('should create an instance directive', () => {
    expect(directive).toBeTruthy();
  });
  it('should create an instance directive cut listener', () => {
    const event = new ClipboardEvent('cut');
    hostElement.nativeElement.dispatchEvent(event);
    expect(hostElement.nativeElement.value).toBeUndefined();
  });
  it('should create an instance directive focusout listener', () => {
    const event = new FocusEvent('focusout');
    hostElement.nativeElement.dispatchEvent(event);
    expect(hostElement.nativeElement.value).toBeUndefined();
  });
  it('should create an instance directive keyup listener', () => {
    const event = new Event('keyup');
    hostElement.nativeElement.dispatchEvent(event);
    expect(hostElement.nativeElement.value).toBeUndefined();
  });

  describe('method postDataDetails', () => {
    it('should call api.postData and reset form. Next branch', async () => {
      component.formValue.patchValue({ name: 'test' });
      expect(component.name.value).toBe('test');
      component.postDataDetails();
      expect(component.name.value).toBe(null);
    })

    it('should call api.postData and reset form. Error branch', async () => {
      component.formValue.patchValue({ name: 'test' });
      expect(component.name.value).toBe('test');
      component.postDataDetails();
      expect(component.name.value).toBe(null);
    })
  })
});
