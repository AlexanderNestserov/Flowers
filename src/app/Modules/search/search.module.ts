import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        InputTextModule,
        ButtonModule,
        FormsModule
    ]
})
export class SearchModule { }
