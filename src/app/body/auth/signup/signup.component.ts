import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../../shared/services/UI.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  errMsg = '';
  isLoading = false;
  private errorMsgSubs: Subscription;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
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

    this.signUpForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'name': new FormControl(null, [Validators.required, Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'document': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(14),
        Validators.pattern('^[0-9]+$')]),
        'birthDate': new FormControl(null, [Validators.required]),
        'gender': new FormControl('m', [Validators.required]),
        'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('^[0-9 )(-]+$')]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirmedPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
    if (this.errorMsgSubs) {
      this.errorMsgSubs.unsubscribe();
    }
  }

  onSignUp() {
    if (this.signUpForm.valid && this.signUpForm.touched) {
      this.errMsg = '';

      this.authService.signUpUser(this.signUpForm.value);

    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
    }
  }

}
