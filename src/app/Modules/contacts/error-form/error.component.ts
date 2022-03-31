import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-field-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class PrintErrorComponent implements OnInit {
    @Input() formControlItem: any;
    @Input() placeholder: string = '';

    constructor() { }

    ngOnInit() { }
}