import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isMenu = true;
  isShow = true;
  isShown = false;

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
