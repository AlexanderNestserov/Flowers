import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: SpinnerService) { }

}
