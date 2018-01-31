import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private userAccService: UserAccountService) { }

  ngOnInit() {
  }

}
