import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CartItem } from '../../../shared/models/cart-item.model';
import { Product } from '../../../shared/models/product.model';
import { ShoppingCart } from '../../../shared/models/cart.model';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../auth/auth.service';


interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}
// Mostrar msg caso usuário não esteja logado...
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: Observable<ShoppingCart>;
  public vazio;
  public isLoading;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  public productToBeRemoved: Product;

  private products: Product[];
  private cartSubscription: Subscription;

  @ViewChild('myModal2') myModal2;

  public constructor(private productsService: ProductService,
    private shoppingCartService: CartService,
    private authService: AuthService,
    private router: Router) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });
    });
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product, quantity: number): void {
    if (quantity > 1) {
      this.shoppingCartService.addItem(product, -1);
    }
  }

  public setProductToBeRemoved(product: Product): void {
    this.productToBeRemoved = product;
  }

  public removeAllProductFromCart(): void {

    this.shoppingCartService.addItem(this.productToBeRemoved, -999);
    this.productToBeRemoved = undefined;

  }

  public toCheckout(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/checkout']);
    } else {
      this.myModal2.open();
    }
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
