import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-registration',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class PrintErrorRegistrationComponent {
  @Input() formControlItem!: FormControl;
}
