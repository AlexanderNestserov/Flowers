import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        ToggleButtonModule,
        HeaderRoutingModule,
    ],
    providers: [Location]
})
export class HeaderModule { }
