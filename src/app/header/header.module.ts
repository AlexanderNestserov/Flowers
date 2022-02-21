import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';



@NgModule({
    declarations: [
        HeaderComponent,


    ],
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        ToggleButtonModule
    ],
    providers: [],
})
export class HeaderModule { }
