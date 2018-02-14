import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderToCancel: any;
  public noOrder = true;
  @ViewChild('myModal') myModal;

  constructor(public auth: AuthService, private userService: UserAccountService) { }

  ngOnInit() {

  }

  public hasOrder(): boolean {
    this.noOrder = false;
    return true;
  }

  public onCancelOrder(order) {
    this.orderToCancel = order;
    this.myModal.open();
  }

  public cancelOrder(cancel: boolean) {
    if (cancel) {
      this.userService.cancelOrder(this.orderToCancel);
    } else {
      this.orderToCancel = null;
    }
  }
}
