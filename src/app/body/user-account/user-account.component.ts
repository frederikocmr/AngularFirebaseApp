import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserAccountService } from './user-account.service';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userAccService: UserAccountService
  ) { }

  ngOnInit() {
    this.userAccService.initUserListener();
    console.log('abriu user-account');
  }

  onLogOut() {
    this.userAccService.destroyUserListener();
    this.authService.logOut();
  }

}
