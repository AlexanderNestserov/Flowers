import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { UrlInterceptor } from '../../../environments/environment';
import { PopupErrorSuccessModule } from '../popup-success-error/popupErrorSuccess.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ContactsComponent

  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    PopupErrorSuccessModule,
    InputTextModule
  ],
  providers: [ContactsService,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ]
})
export class ContactsModule { }

