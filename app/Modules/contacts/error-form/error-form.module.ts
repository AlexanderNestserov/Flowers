import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrintErrorComponent } from './error.component';

@NgModule({
    declarations: [
        PrintErrorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [PrintErrorComponent]
})
export class ErrorFormModule { }
