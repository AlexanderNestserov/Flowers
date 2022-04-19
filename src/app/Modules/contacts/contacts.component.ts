import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  divTrigger,
  divTriggerError,
} from '../popup-success-error/popupSuccessError.animations';

enum ClickedDivState {
  hide = 'hide',
  show = 'show',
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError],
})
export class ContactsComponent implements OnInit {
  clickedDivState: ClickedDivState = ClickedDivState.hide;
  clickedDivStateError: ClickedDivState = ClickedDivState.hide;
  isDisabled = false;
  contactsData: Observable<any> = this.api.getAdress();
  formValue: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    text: ['', [Validators.required, Validators.maxLength(255)]],
  });

  constructor(private api: ContactsService, private formbuilder: FormBuilder) {}

  ngOnInit(): void {}

  get name() {
    return this.formValue.get('name') as FormControl;
  }

  get phone() {
    return this.formValue.get('phone') as FormControl;
  }

  get text() {
    return this.formValue.get('text') as FormControl;
  }

  postDataDetails() {
    this.isDisabled = true;
    this.api.postData({ ...this.formValue.value }).subscribe({
      next: () => {
        this.clickedDivState = ClickedDivState.show;
        this.formValue.reset();
      },
      error: () => {
        this.clickedDivStateError = ClickedDivState.show;
        this.formValue.reset();
      },
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
