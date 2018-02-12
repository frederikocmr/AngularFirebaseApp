import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../../../../shared/models/product.model';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Output() productAdded = new EventEmitter<{ product: Product, quantity: number }>();
  @Input() product: Product;
  paramsSubscription: Subscription;
  category: string;
  quantity = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.category = this.route.snapshot.params['category'];
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
      });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  addItem() {
    this.quantity++;
  }

  removeItem() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart(toCart: boolean) {
    if (this.quantity > 0) {
      this.productAdded.emit({
        product: this.product,
        quantity: this.quantity
      });

      this.quantity = 0;

      if (toCart) {
        this.router.navigate(['/carrinho']);
      }

    } else {
      alert('É necessário selecionar a quantidade que deseja adicionar!');
    }
  }

}
