import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { Observable, of } from 'rxjs';
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
    ctrl.setValue(true);
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
});
