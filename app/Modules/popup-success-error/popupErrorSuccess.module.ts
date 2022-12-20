import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupErrorComponent } from './popupError.component';
import { PopupSuccessErrorComponent } from './popupSuccessError.component';

@NgModule({
    declarations: [
        PopupErrorComponent,
        PopupSuccessErrorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [PopupErrorComponent,
        PopupSuccessErrorComponent]
})
export class PopupErrorSuccessModule { }
