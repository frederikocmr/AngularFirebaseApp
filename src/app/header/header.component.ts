import { Component, OnInit } from '@angular/core';
import { AuthService } from '../body/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hamb = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
