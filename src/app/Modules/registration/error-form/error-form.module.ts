import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrintErrorRegistrationComponent } from './error.component';

@NgModule({
  declarations: [PrintErrorRegistrationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [PrintErrorRegistrationComponent],
})
export class ErrorFormRegistrationModule {}
