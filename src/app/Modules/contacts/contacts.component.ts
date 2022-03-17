import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMeDto } from './contacts.model';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('clickedDiv', [
      state('start', style({
        position: 'fixed',
        right: '1rem',
        top: '-20rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
      })),
      state('end', style({
        position: 'fixed',
        right: '1rem',
        top: '10rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
      })),
      transition('start<=>end', animate('0.5s'))
    ]),
    trigger('clickedErr', [
      state('start', style({
        position: 'fixed',
        right: '1rem',
        top: '-20rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
      })),
      state('end', style({
        position: 'fixed',
        right: '1rem',
        top: '10rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
      })),
      transition('start<=>end', animate('0.5s'))
    ])
  ]
})
export class ContactsComponent implements OnInit {

  clickedDivState = 'start';
  clickedDivErr = 'start';
  contactsData: Observable<any> = this.api.getAdress();
  formValue: FormGroup = new FormGroup({});
  listModelObj: ContactMeDto = new ContactMeDto();
  isClose = true;


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
          this.clickedDivState = 'end';
          reset;
        },
        error: (error) => {
          console.log(error);
          this.clickedDivErr = 'end';
          reset;
        }
      });
  }
  closeMenu() {
    this.clickedDivState = 'start';
    this.clickedDivErr = 'start';
  }
}
