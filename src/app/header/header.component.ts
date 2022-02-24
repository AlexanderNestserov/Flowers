import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isMenu = true;
  isShow = true;
  isShown = false;
  scroll: any;

  constructor() { }

  ngOnInit(): void {

  }

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.isShown = !this.isShown;
    if (this.isShow === false) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }

  }
  toggleDisplays() {
    if (!this.isShow) {
      this.toggleDisplay()
    }
  }

  toggleUser() {
    this.isMenu = !this.isMenu;
  }


}
