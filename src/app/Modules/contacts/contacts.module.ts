import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { UrlInterceptor } from '../../../environments/environment';
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
    ContactsService, { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsModule { }

