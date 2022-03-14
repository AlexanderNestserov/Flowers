import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserContacts } from './contacts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {

  contactsData: Observable<any> = this.api.getAdress();
  formValue: FormGroup = new FormGroup({});
  listModelObj: UserContacts = new UserContacts();
  sendData: boolean = true;



  constructor(private api: ContactsService, private formbuilder: FormBuilder, private http: HttpClient) { }

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
