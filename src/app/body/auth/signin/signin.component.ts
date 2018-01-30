import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../../shared/services/UI.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  errMsg = '';
  isLoading = false;
  private errorMsgSubs: Subscription;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.checkUserRedirect();
    setTimeout(() => {
      this.checkUserRedirect();
    }, 2000);

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.errorMsgSubs = this.uiService.errorMsgStateChanged.subscribe(
      errMsg => {
        this.errMsg = errMsg;
      }
    );

    this.signInForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  checkUserRedirect() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/minha-conta']);
    }
  }

  onSignIn() {
    if (this.signInForm.valid && this.signInForm.touched) {
      this.errMsg = '';
      const email = this.signInForm.get('email').value;
      const password = this.signInForm.get('password').value;

      this.authService.signInUser(email, password);
    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
    }
  }

  forgotPassword() {
    alert('Funcionalidade indisponível no momento! Contate o suporte.');
  }

  onLoginGoogle() {
    this.auth.googleLogin();
  }

  onLoginFacebook() {
    this.auth.facebookLogin();
  }

}
