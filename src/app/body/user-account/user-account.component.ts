import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['dados'], { relativeTo: this.route });
  }

  onLogOut() {

    this.authService.logOut();
  }

}