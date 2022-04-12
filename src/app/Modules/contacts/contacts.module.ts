import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { PopupErrorSuccessModule } from '../popup-success-error/popupErrorSuccess.module';
import { ErrorFormModule } from './error-form/error-form.module';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    PopupErrorSuccessModule,
    ErrorFormModule,
    ErrorDirectiveModule
  ],
  providers: [
    ContactsService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsModule { }

