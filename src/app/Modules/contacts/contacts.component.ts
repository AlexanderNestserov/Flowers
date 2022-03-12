import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataModel } from './contacts.model'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {

  contactsData: any;
  formValue: FormGroup = new FormGroup({});
  listModelObj: DataModel = new DataModel();
  sendData: boolean = true;


  constructor(private api: ContactsService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getFullAdress()

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
    this.listModelObj.phone = +this.formValue.value.phone;
    this.listModelObj.textMessage = this.formValue.value.textMessage;

    this.api.postData(this.listModelObj)
      .subscribe(res => {
        console.log(res);
        this.formValue.reset({
          name: '',
          phone: '',
          textMessage: ''
        });
        if (res) {
          alert(" Success");
        }
      }, error => {
        alert("Not success");
      })
  }
  getFullAdress() {
    this.api.getAdress()
      .subscribe(res => {
        this.contactsData = res;
      })
  }
}
