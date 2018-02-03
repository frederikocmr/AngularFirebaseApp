import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../body/auth/auth.service';
import { CartService } from '../shared/services/cart.service';
import { ShoppingCart } from '../shared/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hamb = false;
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  public itemCount: number;

  constructor(private authService: AuthService, private shoppingCartService: CartService) { }

  ngOnInit() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

}
