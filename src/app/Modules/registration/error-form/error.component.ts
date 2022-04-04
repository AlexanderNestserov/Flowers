import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'app-field-error-registration',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class PrintErrorRegistrationComponent {
    @Input() formControlItem: any;
}
