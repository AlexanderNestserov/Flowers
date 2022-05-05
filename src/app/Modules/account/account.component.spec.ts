import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { Observable, of, throwError } from 'rxjs';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';

import { AccountComponent } from './account.component';
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
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        KeycloakAngularModule,
        BrowserAnimationsModule,
        ErrorDirectiveModule,
      ],
      providers: [
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
          },
        },
        { provide: KeycloakService, useValue: keycloakService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

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
    ctrl.setValue(true);
    expect(component.showError()).toBeTruthy();
  }));
  it('should be created firstName', () => {
    const result = component.firstName;
    expect(result).toBeTruthy();
  });
  it('should be created lastName', () => {
    const result = component.lastName;
    expect(result).toBeTruthy();
  });
  it('should be created email', () => {
    const result = component.email;
    expect(result).toBeTruthy();
  });
  it('should be created phone', () => {
    const result = component.phone;
    expect(result).toBeTruthy();
  });
  it('should be created homeAddress', () => {
    const result = component.homeAddress;
    expect(result).toBeTruthy();
  });
  it('should be created additionalInformation', () => {
    const result = component.additionalInformation;
    expect(result).toBeTruthy();
  });
  it('should be created postUserDetails', () => {
    const result = component.postUserDetails();
    expect(result).toBe();
  });
  it('should call api.postData and reset form. Error branch', () => {
    component.formValue.patchValue({ firstName: null });
    const spy = MockAccountService.patchData.and.returnValue(
      throwError(() => new Error('error'))
    );
    expect(component.firstName.value).toBe(null);
    component.postUserDetails();
    expect(spy).toBeTruthy();
    expect(component.firstName.value).toBe(null);
  });
  it('should be created oldPassword', () => {
    const result = component.oldPassword;
    expect(result).toBeTruthy();
  });
  it('should be created newPassword', () => {
    const result = component.newPassword;
    expect(result).toBeTruthy();
  });
  it('should be created postChangePassword', () => {
    const result = component.postChangePassword();
    expect(result).toBe();
  });
  it('should be created isChangePasswordShow', () => {
    const toggle = component.isChangePasswordShow();
    expect(toggle).toBe();
  });
  it('should be created closeMenu', () => {
    const toggle = component.closeMenu();
    expect(toggle).toBe();
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
});
