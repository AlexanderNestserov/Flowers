import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
<<<<<<< HEAD
    providers: [SpinnerService],
=======
    providers: [SpinnerService,
    ],
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
    exports: [SpinnerComponent]
})
export class SpinnerModule { }
