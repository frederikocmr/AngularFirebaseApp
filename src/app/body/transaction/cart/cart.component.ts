import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalModule } from 'ngx-modal';

import { Product } from '../../../shared/models/product.model';
import { Cart } from '../../../shared/models/cart.model';
import { CartService } from '../../../shared/services/cart.service';
import { UIService } from '../../../shared/services/UI.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart[];
  private cartSubscription: Subscription;
  private loadingSubscription: Subscription;
  private total: number;

  message: string;
  vazio: boolean;
  isLoading = true;


  constructor(private cartService: CartService, private uiService: UIService) { }
  // !!!!!!
  // deu certo mas tem que arrumar de acordo com user /id,
  // tá dando para pegar como array semore na posicao 0... arrumar
  // para inserir so dar pull no objeto item para quando tiver na loja add to carrinho

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );

    this.cartSubscription = this.cartService.cartChanged.subscribe(
      cart => {
        this.cart = cart;
      }
    );
    this.cartService.fecthCart();

    // this.getCartOn();
  }
  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

  }

  onRemoveItem(id: number) {
    // console.log(id);
  }

  getCartOn() {
    if (this.cart !== undefined) {
      this.vazio = false;
    } else {
      this.vazio = true;
      this.message = 'Carrinho vazio!';
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let value = 0;
    this.cart[0].itens.forEach(element => {
      value += (element.product.value + (element.product.value2 / 100)) * element.quantity;
    });

    this.total = +value.toFixed(2);
  }

}
