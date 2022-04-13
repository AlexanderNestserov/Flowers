import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintErrorDirective } from './error-form.directive';

@NgModule({
    declarations: [
        PrintErrorDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
<<<<<<< HEAD
=======
        ReactiveFormsModule,
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
        ReactiveFormsModule
    ],
    providers: [],
    exports: [PrintErrorDirective]
})
export class ErrorDirectiveModule { }
