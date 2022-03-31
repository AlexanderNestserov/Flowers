import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrintErrorDirective } from './error-form.directive';

@NgModule({
    declarations: [
        PrintErrorDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [PrintErrorDirective]
})
export class ErrorDirectiveModule { }
