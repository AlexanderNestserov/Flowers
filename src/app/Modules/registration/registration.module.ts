import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { SpinnerModule } from '../spinner/spinner.module';
import { UrlInterceptor } from '../../../environments/environment';
import { PopupErrorSuccessModule } from '../popup-success-error/popupErrorSuccess.module';

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
        PopupErrorSuccessModule
    ],
    providers: [RegistrationService,
        { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    ]
})
export class RegistrationModule { }
