import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMeDto } from './contacts.model';
import { Observable } from 'rxjs';
import { divTrigger, divTriggerError } from '../popup-success-error/popupSuccessError.animations';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError]
})
export class ContactsComponent implements OnInit {

  clickedDivState = 'hide';
  clickedDivErr = 'hide';
  contactsData: Observable<any> = this.api.getAdress();
  formValue: FormGroup = new FormGroup({});
  listModelObj: ContactMeDto = new ContactMeDto();

  constructor(private api: ContactsService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255),]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      textMessage: ['', [Validators.required, Validators.maxLength(255)]]
    })

  }
  get name() {
    return this.formValue.get('name') as FormControl
  }
  get phone() {
    return this.formValue.get('phone') as FormControl
  }
  get textMessage() {
    return this.formValue.get('textMessage') as FormControl
  }

  postDataDetails() {
    this.listModelObj.name = this.formValue.value.name;
    this.listModelObj.phone = this.formValue.value.phone;
    this.listModelObj.text = this.formValue.value.textMessage;
    const reset = this.formValue.reset({
      name: '',
      phone: '',
      textMessage: ''
    });
    this.api.postData(this.listModelObj)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.listModelObj);
          this.clickedDivState = 'show';
          reset;
        },
        error: (error) => {
          console.log(error);
          this.clickedDivErr = 'show';
          reset;
        }
      });
  }
  closeMenu() {
    this.clickedDivState = 'hide';
    this.clickedDivErr = 'hide';
  }
}
