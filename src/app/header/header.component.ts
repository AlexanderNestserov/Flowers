import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

import { Input } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isShow = true;
  isShown = false;
  scroll: any;
  constructor() { }

  ngOnInit(): void {

  }

  toggleDisplay() {
    this.isShow = !this.isShow;
    this.isShown = !this.isShown;
    if (!this.isShow) {
      document.body.style.overflow = 'hidden';
    }
  }
  toggleDisplays() {
    if (!this.isShow) {
      this.toggleDisplay()
    }
  }

}
