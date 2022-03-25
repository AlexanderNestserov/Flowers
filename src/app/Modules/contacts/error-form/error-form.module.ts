import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrintErrorComponent } from './error.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        PrintErrorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [PrintErrorComponent]
})
export class ErrorFormModule { }
