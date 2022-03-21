import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMeDto } from './contacts.model';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { divTrigger, divTriggerError } from '../popup-success-error/popupSuccessError.animations';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError]
})
export class ContactsComponent implements OnInit {

  isVisible = false;
  isVisibleError = false;
  contactsData: Observable<any> = this.api.getAdress();
  formValue: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255),]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    text: ['', [Validators.required, Validators.maxLength(255)]]
  });


  constructor(private api: ContactsService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  get name() {
    return this.formValue.get('name') as FormControl
  }

  get phone() {
    return this.formValue.get('phone') as FormControl
  }

  get text() {
    return this.formValue.get('text') as FormControl
  }

  postDataDetails() {
    this.api.postData({ ...this.formValue.value })
      .subscribe({
        next: (res) => {

          this.isVisible = true;
          this.formValue.reset();

          return timer(2000).pipe(
            mergeMap(async () => {

              () => this.hide()
            }))

        },
        error: (error) => {
          this.isVisibleError = true;
          this.formValue.reset();
        }
      });
  }

  hide() {
    this.isVisible = false
  }
  closeMenu() {
    this.isVisible = false;
    this.isVisibleError = false;
  }
}
