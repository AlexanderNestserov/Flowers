import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor() { }

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.isShown = !this.isShown;
    if (!this.isShow) {
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
      fromEvent(window, 'scroll').subscribe(callbackFunc);
      function callbackFunc() {
        let y = window.pageYOffset;
        if (y > 0) {
          document.querySelector('.header')?.classList.add("scroll");
        } else {
          document.querySelector('.header')?.classList.remove("scroll");
        }
      }
    }
  }

}
