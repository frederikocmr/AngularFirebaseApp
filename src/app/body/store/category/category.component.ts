import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Input() cat: Category;
  @Input() id: number;

  categoryClicked: boolean;
  categoryClickedHide: boolean;

  paramsSubscription: Subscription;
  actualCategory: string;
  categorySelected = false;
  subscribed = false;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkRoute();

    if (this.route.firstChild) {
      this.categoryClicked = true;
      this.categoryClickedHide = true;

      if (this.route.snapshot.firstChild.params['category'] === this.cat.path) {
        this.categorySelected = true;
      } else {
        this.categorySelected = false;
      }

    }
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  onCategoryClick() {
    this.onRouteChange();
  }

  onRouteChange() {
    this.router.navigate(['/loja', this.cat.path]);
  }

  onCategoryClickMini() {
    this.onRouteChange();
    this.checkRoute();
  }

  checkRoute() {
    if (!this.subscribed) {
      this.paramsSubscription = this.router.events.subscribe(
        (val) => {
          if (val instanceof NavigationEnd) {
            this.actualCategory = (val.url.split('/'))[2];
            if (this.actualCategory) {

              this.categoryClicked = true;
              this.categoryClickedHide = true;

              if (this.actualCategory === this.cat.path) {
                this.categorySelected = true;
              } else {
                this.categorySelected = false;
              }

            } else {
              // clicou no /loja
              this.categoryClicked = false;
              this.categoryClickedHide = false;
            }
          }
          this.subscribed = true;
        }, (error) => {
          console.log('err paramsSubscription');
        }
      );
    }
  }
}
