import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../body/auth/auth.service';
import { CartService } from '../shared/services/cart.service';
import { ShoppingCart } from '../shared/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public hamb = false;
  public mouseOvered: boolean;
  public cart: Observable<ShoppingCart>;
  private cartSubscription: Subscription;
  public itemCount: number;

  constructor(public authService: AuthService, private shoppingCartService: CartService) { }

  ngOnInit() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      setTimeout(() => {
        this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      }, 500);
    });

  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
