import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [SpinnerService],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
