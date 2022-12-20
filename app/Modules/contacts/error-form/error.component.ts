import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class PrintErrorComponent {
  @Input() formControlItem!: FormControl;
}
