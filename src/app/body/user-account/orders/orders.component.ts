import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public noOrder = true;
  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

  public hasOrder(): boolean {
    this.noOrder = false;
    return true;
  }

  public cancelOrder(order) {
    console.log(order);
  }
}
