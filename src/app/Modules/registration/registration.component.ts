import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { RegisterUserDto } from './registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  formValue: FormGroup = new FormGroup({});
  listModelObj: RegisterUserDto = new RegisterUserDto();
  sendData: boolean = true;



  constructor(private api: RegistrationService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {


    this.formValue = this.formbuilder.group({
      fullname: ['', [Validators.required, Validators.maxLength(255),]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      homeAddress: ['', [Validators.maxLength(255),]],
      additionalInformation: ['', [Validators.maxLength(255),]],
      passwords: this.formbuilder.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9][A-Z][a-z]/)]],
        confirmPassword: ['', [Validators.required]]
      }, {
        validator: this.confirmPassword('password', 'confirmPassword')
      })
    })

  }
  // get name() {
  //    return this.formValue.get('name') as FormControl
  // }
  // get phone() {
  //    return this.formValue.get('phone') as FormControl
  // }
  // get textMessage() {
  //    return this.formValue.get('textMessage') as FormControl

  //  }

  confirmPassword(controlName: string, matchingControlName: string) {
    return (FormGroup: FormGroup) => {
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  postDataDetails() {
    //  this.listModelObj.name = this.formValue.value.name;
    //  this.listModelObj.phone = this.formValue.value.phone;
    //  this.listModelObj.text = this.formValue.value.textMessage;



    this.api.postData(this.listModelObj)
      .subscribe(res => {

        console.log(res);
        alert(" Success");
        this.formValue.reset({
          name: '',
          phone: '',
          textMessage: ''
        });
      }, (error) => {
        console.log(error);
        alert("Not Success");
      });

  }

}
