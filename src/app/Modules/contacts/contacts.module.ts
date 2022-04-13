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
<<<<<<< HEAD
  providers: [ContactsService],
=======
  providers: [
    ContactsService,
  ],
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsModule { }

