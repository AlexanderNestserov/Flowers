import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { RegisterUserDto } from './registration.model';
import { divTrigger, divTriggerError } from '../popup-success-error/popupSuccessError.animations';
import { ConfirmPassword } from './confirmPassword.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError]
})


export class RegistrationComponent implements OnInit {
  static passwordConfirming: ConfirmPassword;
  clickedDivState = 'hide';
  clickedDivErr = 'hide';
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
  isDisabled = false

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

  postDataDetails() {
    this.isDisabled = true
    this.api.postData({ ...this.formValue.value })
      .subscribe({
        next: (res) => {
          this.formValue.reset();
          this.clickedDivState = 'show';
        },
        error: (error) => {
          this.formValue.reset();
          this.clickedDivErr = 'show';
        }
      });
    this.isDisabled = false
  }
  closeMenu() {
    this.clickedDivState = 'hide';
    this.clickedDivErr = 'hide';
  }
}
