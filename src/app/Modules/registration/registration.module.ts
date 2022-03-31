import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { SpinnerModule } from '../spinner/spinner.module';
import { UrlInterceptor } from '../../../environments/environment';
import { PopupErrorSuccessModule } from '../popup-success-error/popupErrorSuccess.module';
import { ErrorDirectiveModule } from 'src/app/directives/error-form/error-directive.module';
import { ErrorFormRegistrationModule } from './error-form/error-form.module';

@NgModule({
    declarations: [
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RegistrationRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SpinnerModule,
        PopupErrorSuccessModule,
        ErrorDirectiveModule,
        ErrorFormRegistrationModule
    ],
    providers: [RegistrationService,
        { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistrationModule { }
