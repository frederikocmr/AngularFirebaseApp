import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { UserAccountService } from '../../user-account/user-account.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private userAccService: UserAccountService, private shoppingCartService: CartService) { }

  ngOnInit() {

    this.shoppingCartService.empty();
  }

}
