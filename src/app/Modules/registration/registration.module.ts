import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { ConfirmPasswordDirective } from './confirmPassword.directive';

@NgModule({
    declarations: [
        RegistrationComponent,
        ConfirmPasswordDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RegistrationRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [RegistrationService]
})
export class RegistrationModule { }
