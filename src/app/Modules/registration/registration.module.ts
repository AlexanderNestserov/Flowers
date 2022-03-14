import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
    declarations: [
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RegistrationRoutingModule
    ]
})
export class RegistrationModule { }
