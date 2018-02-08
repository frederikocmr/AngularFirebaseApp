import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public carousel_active: number;
  public intervalref;
  public mouseOvered: boolean;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.carousel_active = 0;
    this.waitCarousel();
  }

  waitCarousel() {
    this.intervalref = setInterval(() => {
      this.carousel_active = (this.carousel_active === 0 ? 1 : 0);
    }, 7000);
  }


  changeCarousel() {
    clearInterval(this.intervalref);
    this.waitCarousel();
    this.carousel_active = (this.carousel_active === 0 ? 1 : 0);
  }

}
