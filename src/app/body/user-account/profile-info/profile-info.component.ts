import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { UserAccountService } from '../user-account.service';
import { User } from '../../../shared/interfaces/user.interface';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  editMode = false;
  editInfoForm: FormGroup;
  errMsg = '';
  successMsg = '';

  constructor(private userAccService: UserAccountService, public auth: AuthService) { }

  ngOnInit() {

    this.editInfoForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'displayName': new FormControl(null, [Validators.required, , Validators.minLength(3)]),
        'document': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
        'birthDate': new FormControl(null, [Validators.required]),
        'gender': new FormControl(null, [Validators.required]),
        'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(8)])
      }
    );
  }

  onEdit() {
    this.editMode = true;
    this.editInfoForm.setValue({
      'email': (this.userAccService.aUser.email ? this.userAccService.aUser.email : ''),
      'displayName': (this.userAccService.aUser.displayName ? this.userAccService.aUser.displayName : ''),
      'document': (this.userAccService.aUser.document ? this.userAccService.aUser.document : ''),
      'birthDate': (this.userAccService.aUser.birthDate ? this.userAccService.aUser.birthDate : ''),
      'gender': (this.userAccService.aUser.gender ? this.userAccService.aUser.gender : ''),
      'phoneNumber': (this.userAccService.aUser.phoneNumber ? this.userAccService.aUser.phoneNumber : '')
    });
  }

  onLeaveEdit() {
    this.editMode = false;
  }

  onEditDone() {

    if (this.editInfoForm.valid) {
      this.errMsg = '';
      this.editMode = false;
      this.userAccService.updateUserData(this.editInfoForm.value);
      this.successMsg = 'Dados atualizados com sucesso!';

    } else {
      this.errMsg = 'Por favor, verifique os dados e tente novamente!';
      this.successMsg = '';
    }

  }

}
