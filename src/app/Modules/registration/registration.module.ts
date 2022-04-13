import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { SpinnerModule } from '../spinner/spinner.module';

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
        ReactiveFormsModule,
        SpinnerModule,
        PopupErrorSuccessModule,
        ErrorDirectiveModule,
        ErrorFormRegistrationModule
    ],
<<<<<<< HEAD
    providers: [RegistrationService]
=======
    providers: [RegistrationService,
    ]
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
})
export class RegistrationModule { }
