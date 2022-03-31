import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrintErrorRegistrationComponent } from './error.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        PrintErrorRegistrationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [PrintErrorRegistrationComponent]
})
export class ErrorFormRegistrationModule { }
