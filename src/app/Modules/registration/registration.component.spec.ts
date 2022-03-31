import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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
import { Observable, of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, CommonModule, ErrorDirectiveModule],
      providers: [{
        provide: RegistrationService, useClass: class MockRegistrationService {
          postData(formValue: RegisterUserDto): Observable<any> {
            return of({})
          }
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created dialogTitle', () => {
    const link = fixture.debugElement.query(By.css('.container__linking'));
    link.nativeElement.click();
    expect(component.dialogTitle).toBeTruthy()
  });
  it('should be created checked', () => {
    const link = fixture.debugElement.query(By.css('.container__action'));
    link.nativeElement.click();
    expect(component.checked).toBeTruthy()
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
  it('should be created closeMenu error', () => {
    const link = fixture.debugElement.query(By.css('.container__button'));
    link.nativeElement.click();
    expect(component.postDataDetails).toBeTruthy()
  });
  it('should be created postDataDetails', () => {
    const result = component.postDataDetails()
    expect(result).toBe()
  });
  it('should be created homeAddress', () => {
    const result = component.homeAddress
    expect(result).toBeTruthy()
  });
  it('should be created addition information', () => {
    const result = component.additionalInformation
    expect(result).toBeTruthy()
  });
  it('should be created myCheckbox', () => {
    const result = component.myCheckbox
    expect(result).toBeTruthy()
  });
  it('should be created showError true', fakeAsync(async () => {
    let ctrl = component.confirmPassword;
    ctrl.invalid && ctrl.touched && ctrl.errors// || component.formValue.errors?.['noMatchingPassword'];
    ctrl.setValue(true);
    fixture.detectChanges();
    expect(component.showError()).toBeTruthy()
  }));
  it('should be created showError true', fakeAsync(async () => {
    let ctrl = component.confirmPassword;
    component.formValue.errors?.['noMatchingPassword'];
    ctrl.setValue(true);

    expect(component.showError()).toBeTruthy()
  }));
});