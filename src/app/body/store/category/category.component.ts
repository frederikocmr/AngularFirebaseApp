import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() cat: Category;
  @Input() id: number;

  @Input() categoryClicked: boolean;
  @Input() categoryClickedHide: boolean;

  handleRoute: any;
  paramsSubscription: Subscription;
  actualCategory: string;
  categorySelected = false;
  subscribed = false;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkRoute();
  }

  onCategoryClick() {
    this.handleRoute = setInterval(() => this.onRouteChange(), 500);
  }

  onRouteChange() {
    this.router.navigate(['/loja', this.cat.path]);
    clearInterval(this.handleRoute);
  }

  onCategoryClickMini() {
    this.onRouteChange();
    this.checkRoute();

  }

  checkRoute() {
    if (this.route.firstChild) {
      if (!this.subscribed) {
        this.actualCategory = this.route.snapshot.firstChild.params['category'];
        this.paramsSubscription = this.route.firstChild.params.subscribe(
          (params: Params) => {
            // porem nao funciona quando nao tem nenhuma category, fazer funcionar quaando clica desde incio /loja...
            this.actualCategory = params['category'];
            if (this.actualCategory === this.cat.path) {
              this.categorySelected = true;
            } else {
              this.categorySelected = false;
            }
            this.subscribed = true;
          }
        );
      }
    }
  }

}
