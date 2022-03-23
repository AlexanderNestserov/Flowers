import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { divTrigger, divTriggerError } from '../popup-success-error/popupSuccessError.animations';
import { ConfirmPassword } from './confirmPassword.component';

enum ClickedDivState {
  hide = 'hide',
  show = 'show'
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError]
})

export class RegistrationComponent implements OnInit {
  static passwordConfirming: ConfirmPassword;
  clickedDivState: ClickedDivState = ClickedDivState.hide;
  clickedDivStateError: ClickedDivState = ClickedDivState.hide;
  formValue: FormGroup = this.formbuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255),]],
    lastName: ['', [Validators.required, Validators.maxLength(255),]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    homeAddress: ['', [Validators.maxLength(255),]],
    additionalInformation: ['', [Validators.maxLength(255),]],
    myCheckbox: ['boolean'],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9a-zA-Z]/)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  }, { validator: RegistrationComponent.passwordConfirming }
  );
  isDisabled = false;
  isDialog = true;
  isChecked = false

  constructor(private api: RegistrationService, private formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formValue.reset();
  }

  get firstName() {
    return this.formValue.get('firstName') as FormControl
  }
  get lastName() {
    return this.formValue.get('lastName') as FormControl
  }
  get email() {
    return this.formValue.get('email') as FormControl
  }
  get phone() {
    return this.formValue.get('phone') as FormControl
  }
  get homeAddress() {
    return this.formValue.get('homeAddress') as FormControl
  }
  get additionalInformation() {
    return this.formValue.get('additionalInformation') as FormControl
  }
  get password() {
    return this.formValue.get('password') as FormControl
  }
  get confirmPassword() {
    return this.formValue.get('confirmPassword') as FormControl
  }
  get myCheckbox() {
    return this.formValue.get('myCheckbox') as FormControl
  }
  dialogTitle() {
    this.isDialog = false;
  }
  checked() {
    this.isDialog = true;
    this.isChecked = true
  }

  postDataDetails() {
    this.isDisabled = true
    this.api.postData({ ...this.formValue.value })
      .subscribe({
        next: (res) => {
          this.clickedDivState = ClickedDivState.show;
          this.formValue.reset();
        },
        error: (error) => {
          this.clickedDivStateError = ClickedDivState.show;
          this.formValue.reset();
        }
      });
    this.isDisabled = false;
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }

  closeMenu() {
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }
}
