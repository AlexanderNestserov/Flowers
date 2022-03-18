import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { RegisterUserDto } from './registration.model';
import { divTrigger, divTriggerError } from '../popup-success-error/popupSuccessError.animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError]
})
export class RegistrationComponent implements OnInit {
  clickedDivState = 'hide';
  clickedDivErr = 'hide';
  formValue: FormGroup = new FormGroup({});
  listModelObj: RegisterUserDto = new RegisterUserDto();
  sendData: boolean = true;

  constructor(private api: RegistrationService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(255),]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      homeAddress: ['', [Validators.maxLength(255),]],
      additionalInformation: ['', [Validators.maxLength(255),]],
      myCheckbox: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9a-zA-Z]/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.passwordConfirming }
    );

  }
  get fullName() {
    return this.formValue.get('fullName') as FormControl
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

  passwordConfirming(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  postDataDetails() {
    this.listModelObj.firstName = this.formValue.value.fullName.split(' ')[0];
    this.listModelObj.lastName = this.formValue.value.fullName.split(' ')[1];
    this.listModelObj.email = this.formValue.value.email;
    this.listModelObj.phone = this.formValue.value.phone;
    this.listModelObj.homeAddress = this.formValue.value.homeAddress;
    this.listModelObj.additionalInformation = this.formValue.value.additionalInformation;
    this.listModelObj.password = this.formValue.value.password;

    const reset = this.formValue.reset({
      fullName: '',
      email: '',
      phone: '',
      homeAddress: '',
      additionalInformation: '',
      password: '',
      confirmPassword: ''
    });

    this.api.postData(this.listModelObj)
      .subscribe({
        next: (res) => {
          console.log(res);
          reset;
          this.clickedDivState = 'show';
        },
        error: (error) => {
          console.log(error);
          reset;
          this.clickedDivErr = 'show';
        }
      });
  }
  closeMenu() {
    this.clickedDivState = 'hide';
    this.clickedDivErr = 'hide';
  }
}
