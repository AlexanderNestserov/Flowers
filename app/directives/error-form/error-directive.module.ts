import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintErrorDirective } from './error-form.directive';

@NgModule({
  declarations: [PrintErrorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PrintErrorDirective],
})
export class ErrorDirectiveModule {}
