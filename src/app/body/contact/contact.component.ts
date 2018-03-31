import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public errMsg = '';
  public showMore = [false, false, false];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.contactForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'name': new FormControl(null, [Validators.required, Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'type': new FormControl('elogio', [Validators.required]),
        'message': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[A-zÀ-ÿ ?,.!:]+$')])
      }
    );
  }

  onSubmitContact() {
    if (this.contactForm.valid && this.contactForm.touched) {
      this.contactService.checkUserData(this.contactForm.value);
      this.contactForm.reset();
      this.contactForm.get('type').setValue('elogio');
      this.errMsg = '';
    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
    }
  }

  chShowMore(opt: number) {
    this.showMore[opt] = !(this.showMore[opt]);
  }

}
