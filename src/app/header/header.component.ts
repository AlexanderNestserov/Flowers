import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(window:click)": "onClick()"
  }
})
export class HeaderComponent implements OnInit {
  isMenu = true;
  isShow = true;
  isShown = false;
  h = document.querySelector('.header');

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

  toggleUser(event: Event) {
    event.stopPropagation();
    this.isMenu = !this.isMenu;
  }

  onClick() {
    this.isMenu = true;
  }
  ngOnInit(): void {

    window.onload = () => {
      onScroll();
    };

    function onScroll() {
      window.addEventListener("scroll", callbackFunc);
      function callbackFunc() {
        let y = window.pageYOffset;
        if (y > 10) {
          document.querySelector('.header')?.classList.add("scroll");
        } else {
          document.querySelector('.header')?.classList.remove("scroll");
        }
      }
    }
  }
}
