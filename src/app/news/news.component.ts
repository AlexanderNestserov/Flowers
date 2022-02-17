import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  p: number = 1;
  collection: any[] = [];
  constructor() {

  }
  ngOnInit(): void {
    for (let i = 1; i <= 60; i++) {
      this.collection.push(`item ${i}`);
    }


  }
}