import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() id: number;
  quantity = 0;

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.quantity++;
  }

  removeItem() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.quantity > 0) {
      // a
    } else {
      // mostra aviso
    }
  }

}
