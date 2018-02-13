import { Component, OnInit } from '@angular/core';

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
  handleHide: any;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.categories = this.categoryService.getCategories();
  }
}
