import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [CategoryService]
})
export class StoreComponent implements OnInit {
  categories: Category[];

  categoryClicked = false;
  categoryClickedHide = false;

  handleHide: any;

  // criar servico para saber quando é false ou true... depedendo da categoria aberta ou nao...
  // check if the redirect url exist, if not it will redirect to the alternative route /home
  // (you can change home to whatever you like)
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.categories = this.categoryService.getCategories();

    if (this.route.firstChild) {
      this.categoryClicked = true;
      this.categoryClickedHide = true;
    }

  }

  onCategoryClick() {
    this.categoryClicked = true;

    this.handleHide = setInterval(() => this.onCategoryHide(), 800);  // dar clear para tirar loop
  }

  onCategoryHide() {
    this.categoryClickedHide = true;
    clearInterval(this.handleHide);
  }

}
