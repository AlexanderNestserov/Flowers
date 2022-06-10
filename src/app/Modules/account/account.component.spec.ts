import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';

import { AccountComponent, ClickedDivState } from './account.component';
import { AccountService } from './account.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let keycloakService = jasmine.createSpyObj(['login', 'logout', 'isLoggedIn']);
  let service: AccountService;
  let MockAccountService = jasmine.createSpyObj('fakeService', [
    'getUserData',
    'patchData',
    'postChangePassword',
    'mapAddress',
    'addressHTML',
    'address',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        KeycloakAngularModule,
        BrowserAnimationsModule,
        ErrorDirectiveModule,
      ],
      providers: [
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(): Observable<any> {
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
        { provide: KeycloakService, useValue: keycloakService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AccountService);
    keycloakService.login();
    keycloakService.logout();
    keycloakService.isLoggedIn();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    ctrl.setValue(false);
    fixture.detectChanges();
    expect(component.showError()).toBeTruthy();
  }));
  it('should update the control with homeAddress', () => {
    const el = fixture.debugElement.query(By.css(' #inputAddress'));
    const ctrl = component.formValue.get('homeAddress');
    const text = fixture.debugElement.query(By.css(' #inputInfo'));
    const ctrlText = component.formValue.get('additionalInformation');
    const dValue = 'Alex';
    ctrl?.setValue(dValue);
    const tValue = 'hello';
    ctrlText?.setValue(tValue);
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual(dValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dValue);
    expect(text.nativeElement.value).toEqual(tValue);
    expect((text.nativeElement as HTMLInputElement).value).toEqual(tValue);
  });
  it('should update the control with homeAddress', () => {
    const ctrl = component.formValue.get('homeAddress');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeFalsy();
  });
  it('should be created homeAddress', () => {
    const ctrl = component.formValue.get('homeAddress');
    ctrl?.setValue('Alex');
    const result = component.homeAddress.value;
    expect(result).toEqual('Alex');
  });
  it('should be created additionalInformation', () => {
    const ctrl = component.formValue.get('additionalInformation');
    ctrl?.setValue('Alex');
    const result = component.additionalInformation.value;
    expect(result).toEqual('Alex');
  });
  it('should be created postUserDetails', () => {
    const result = component.postUserDetails();
    expect(result).toBeUndefined();
  });
  it('should be created postChangePassword', () => {
    component['http'].postChangePassword = () => throwError({ error: true });
    component.postChangePassword();
    expect(component.clickedDivStateError).toEqual(ClickedDivState.hide);
  });
  it('should be created postUserDetails', () => {
    component['http'].patchData = () => throwError({ error: true });
    component.postUserDetails();
    expect(component.clickedDivStateError).toEqual(ClickedDivState.hide);
  });
  it('should be created oldPassword', () => {
    const ctrl = component.formValue.get('oldPassword');
    ctrl?.setValue('Alex');
    const result = component.oldPassword.value;
    expect(result).toEqual('');
  });
  it('should be created newPassword', () => {
    const ctrl = component.formValue.get('newPassword');
    ctrl?.setValue('Alex');
    const result = component.newPassword.value;
    expect(result).toEqual('');
  });
  it('should be created postChangePassword', () => {
    const result = component.postChangePassword();
    expect(result).toBeUndefined();
  });
  it('should be created isChangePasswordShow', () => {
    component.isFormShow = false;
    component.isChangePasswordShow();
    expect(component.isFormShow).toBeTruthy();
  });
  it('should be created closeMenu', () => {
    const toggle = component.closeMenu();
    expect(toggle).toBeUndefined();
  });
  it('should be created signOut', fakeAsync(() => {
    component.signOut();
    expect(keycloakService.logout).toHaveBeenCalled();
  }));
  it('should be created signOut', fakeAsync(() => {
    component.isLoggedIn = true;
    component.signOut();
    expect(keycloakService.logout).toHaveBeenCalled();
  }));
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
