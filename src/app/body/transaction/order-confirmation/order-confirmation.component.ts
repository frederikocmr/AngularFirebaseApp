import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CartService } from '../../../shared/services/cart.service';
import { UserAccountService } from '../../user-account/user-account.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  public orderConfirmed = false;
  private cartSubscription: Subscription;

  constructor(private userAccService: UserAccountService,
    private shoppingCartService: CartService,
    private trService: TransactionService) { }

  ngOnInit() {
    this.cartSubscription = this.shoppingCartService.get().subscribe((cart) => {
      this.orderConfirmed = this.checkSubsConfirmed(cart);
    }, (error) => {
      alert('Erro, nao foi possivel salvar, atualize a pagina e tente novamente.');
      this.orderConfirmed = false;
    });

    setTimeout(() => {
      if (this.orderConfirmed) {
        this.cartSubscription.unsubscribe();
        this.shoppingCartService.empty();
      }
    }, 500);
  }

  checkSubsConfirmed(cart): boolean {
    if (!this.orderConfirmed) {
      this.trService.createNewOrder(cart.grossTotal);
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
