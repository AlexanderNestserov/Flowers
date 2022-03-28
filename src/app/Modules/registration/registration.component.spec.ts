import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ConfirmPassword } from './confirmPassword.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [RegistrationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

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
  it('should be created checked', fakeAsync(async () => {
    const submitSpy = jasmine.createSpy('submit');
    spyOn(component, 'showError')
    expect(component.confirmPassword.invalid && component.confirmPassword.errors).toBeTruthy()

  }));
});
