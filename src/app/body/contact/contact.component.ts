import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  errMsg = '';

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.contactForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'name': new FormControl(null, [Validators.required, Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'sel1': new FormControl('1', [Validators.required]),
        'message': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[A-zÀ-ÿ ]+$')])
      }
    );
  }

  onSubmitContact() {
    if (this.contactForm.valid && this.contactForm.touched) {

      console.log(this.contactForm);
    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
    }
  }

}
