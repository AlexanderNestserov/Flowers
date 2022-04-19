import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class PrintErrorComponent implements OnInit {
  @Input() formControlItem: any;

  constructor() {}

  ngOnInit() {}
}
