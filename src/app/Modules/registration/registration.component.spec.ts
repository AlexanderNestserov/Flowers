import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import {
  waitForAsync,
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  inject,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { RegisterUserDto } from './registration.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AccountService } from '../account/account.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let keycloak = jasmine.createSpyObj('KeycloakService', ['login']);
  let service: RegistrationService;
  let MockRegistrationService = jasmine.createSpyObj('fakeService', [
    'postData',
  ]);
  let MockAccountService = jasmine.createSpyObj('fakeAccountService', [
    'getUserData',
    'patchData',
    'postChangePassword',
    'mapAddress',
    'addressHTML',
    'address',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        ErrorDirectiveModule,
      ],
      providers: [
        {
          provide: RegistrationService,
          useClass: class MockRegistrationService {
            postData(formValue: RegisterUserDto): Observable<any> {
              return of({});
            }
          },
        },
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(formValue: any): Observable<any> {
              return of({});
            }
            patchData() {
              return of({});
            }
            postChangePassword(formChangePassword: any) {
              return of({});
            }
            mapAddress = new BehaviorSubject('Minsk');
            addressHTML = new BehaviorSubject<ElementRef>({} as ElementRef);
            address = new BehaviorSubject<string>('Brest');
          },
        },
        { provide: KeycloakService, useValue: keycloak },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    keycloak.login();
    service = TestBed.inject(RegistrationService);
    fixture.detectChanges();
  });

  it('should be created', inject(
    [KeycloakService],
    (service: KeycloakService) => {
      expect(service).toBeTruthy();
    }
  ));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created dialogTitle', () => {
    const link = fixture.debugElement.query(By.css('.container__linking'));
    link.nativeElement.click();
    expect(component.dialogTitle).toBeTruthy();
  });
  it('should be created closeMenu', () => {
    const link = fixture.debugElement.query(By.css('app-popup'));
    link.nativeElement.click();
    expect(component.closeMenu).toBeTruthy();
  });
  it('should be created closeMenu error', () => {
    const link = fixture.debugElement.query(By.css('app-popup-error'));
    link.nativeElement.click();
    expect(component.closeMenu).toBeTruthy();
  });
  it('should be created closeMenu error', () => {
    const link = fixture.debugElement.query(By.css('.container__button'));
    link.nativeElement.click();
    expect(component.postDataDetails).toBeTruthy();
  });
  it('should be created postDataDetails', () => {
    const result = component.postDataDetails();
    expect(result).toBeUndefined();
  });
  it('should be created homeAddress', () => {
    const result = component.homeAddress;
    expect(result).toBeTruthy();
  });
  it('should be created addition information', () => {
    const result = component.additionalInformation;
    expect(result).toBeTruthy();
  });
  it('should be created myCheckbox', () => {
    const result = component.myCheckbox;
    expect(result).toBeTruthy();
  });
  it('should be created showError true', fakeAsync(async () => {
    let ctrl = component.confirmPassword;
    ctrl.invalid && ctrl.touched && ctrl.errors;
    ctrl.setValue(true);
    fixture.detectChanges();
    expect(component.showError()).toBeTruthy();
  }));
  it('should be created showError true', fakeAsync(async () => {
    let ctrl = component.confirmPassword;
    component.formValue.errors?.['noMatchingPassword'];
    ctrl.setValue(true);
    expect(component.showError()).toBeTruthy();
  }));
  it('should be created login', async () => {
    component.signIn();
    expect(keycloak.login).toHaveBeenCalled();
  });
  it('should be created login on setTimeout', () => {
    jasmine.clock().install();
    component.postDataDetails();
    jasmine.clock().tick(5000);
    expect(keycloak.login()).toBeUndefined();
    jasmine.clock().uninstall();
  });
  it('should call api.postData and reset form. Error branch', () => {
    component.formValue.patchValue({ firstName: null });
    const spy = MockRegistrationService.postData.and.returnValue(
      throwError(() => new Error('error'))
    );
    expect(component.firstName.value).toBe(null);
    component.postDataDetails();
    expect(spy).toBeTruthy();
    expect(component.firstName.value).toBe(null);
  });
  it('should create an searchMapAdress', () => {
    let event: KeyboardEvent = {
      target: { value: 'A' } as HTMLInputElement,
      altKey: false,
      charCode: 0,
      code: '',
      ctrlKey: false,
      isComposing: false,
      key: '',
      keyCode: 0,
      location: 0,
      metaKey: false,
      repeat: false,
      shiftKey: false,
      getModifierState: function (keyArg: string): boolean {
        throw new Error('Function not implemented.');
      },
      initKeyboardEvent: function (
        typeArg: string,
        bubblesArg?: boolean,
        cancelableArg?: boolean,
        viewArg?: Window | null,
        keyArg?: string,
        locationArg?: number,
        ctrlKey?: boolean,
        altKey?: boolean,
        shiftKey?: boolean,
        metaKey?: boolean
      ): void {
        throw new Error('Function not implemented.');
      },
      DOM_KEY_LOCATION_LEFT: 0,
      DOM_KEY_LOCATION_NUMPAD: 0,
      DOM_KEY_LOCATION_RIGHT: 0,
      DOM_KEY_LOCATION_STANDARD: 0,
      detail: 0,
      view: null,
      which: 0,
      initUIEvent: function (
        typeArg: string,
        bubblesArg?: boolean,
        cancelableArg?: boolean,
        viewArg?: Window | null,
        detailArg?: number
      ): void {
        throw new Error('Function not implemented.');
      },
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (
        type: string,
        bubbles?: boolean,
        cancelable?: boolean
      ): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      AT_TARGET: 0,
      BUBBLING_PHASE: 0,
      CAPTURING_PHASE: 0,
      NONE: 0,
    };
    const result = component.searchMapAdress(event);
    expect(result).toBeUndefined();
  });
});
