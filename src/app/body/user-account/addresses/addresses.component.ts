import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UserAccountService } from '../user-account.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  public editMode = false;
  public openedMode = false;
  public editAddrForm: FormGroup;
  public errMsg = '';
  public successMsg = '';

  constructor(private userAccService: UserAccountService, public auth: AuthService) { }

  ngOnInit() {

    this.editAddrForm = new FormGroup(
      {
        'personName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'type': new FormControl(''),
        'postalCode': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),
        Validators.pattern('^[0-9]+$')]),
        'addressLine': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'number': new FormControl(null, [Validators.required]),
        'complement': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'reference': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'district': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'city': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-zÀ-ÿ ]+$')]),
        'state': new FormControl('GO', [Validators.required])
      }
    );
  }


  onEdit() {
    this.editMode = true;
    this.editAddrForm.setValue({
      'personName': (this.userAccService.aUser.adresses[0].personName ? this.userAccService.aUser.adresses[0].personName : ''),
      'type': (this.userAccService.aUser.adresses[0].type ? this.userAccService.aUser.adresses[0].type : ''),
      'postalCode': (this.userAccService.aUser.adresses[0].postalCode ? this.userAccService.aUser.adresses[0].postalCode : ''),
      'addressLine': (this.userAccService.aUser.adresses[0].addressLine ? this.userAccService.aUser.adresses[0].addressLine : ''),
      'number': (this.userAccService.aUser.adresses[0].number ? this.userAccService.aUser.adresses[0].number : ''),
      'complement': (this.userAccService.aUser.adresses[0].complement ? this.userAccService.aUser.adresses[0].complement : ''),
      'reference': (this.userAccService.aUser.adresses[0].reference ? this.userAccService.aUser.adresses[0].reference : ''),
      'district': (this.userAccService.aUser.adresses[0].district ? this.userAccService.aUser.adresses[0].district : ''),
      'city': (this.userAccService.aUser.adresses[0].city ? this.userAccService.aUser.adresses[0].city : ''),
      'state': (this.userAccService.aUser.adresses[0].state ? this.userAccService.aUser.adresses[0].state : 'GO')
    });
  }

  onLeaveEdit() {
    this.editMode = false;
    this.successMsg = '';
  }

  onEditDone() {

    if (this.editAddrForm.valid) {
      this.errMsg = '';
      this.editMode = false;
      this.userAccService.updateUserAddress(this.editAddrForm.value);
      this.successMsg = 'Dados atualizados com sucesso!';

    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
      this.successMsg = '';
    }

  }

}
