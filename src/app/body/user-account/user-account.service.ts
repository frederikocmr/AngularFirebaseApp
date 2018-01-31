import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../auth/auth.service';
import { User } from '../../shared/interfaces/user.interface';

@Injectable()
export class UserAccountService {
    public aUser: User;
    private userSubs: Subscription;

    constructor(private authService: AuthService, private afs: AngularFirestore) { }

    initUserListener() {

        this.userSubs = this.authService.user.subscribe(
            (user) => {
                this.aUser = user;
            },
            (error) => {
                console.log(error);
            }
        );

    }

    destroyUserListener() {
        if (this.userSubs) {
            this.userSubs.unsubscribe();
        }
    }

    updateUserData(form) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.aUser.uid}`);
        const data: User = {
            uid: this.aUser.uid,
            email: form.email,
            displayName: form.displayName,
            photoURL: (this.aUser.photoURL ? this.aUser.photoURL : ''),
            phoneNumber: form.phoneNumber,
            document: form.document,
            birthDate: form.birthDate,
            gender: form.gender
        };

        userRef.update(data).
            then(() => {
                // update successful (document exists)
            })
            .catch((error) => {
                // (document does not exists)
                userRef.set(data);
            });
    }

    updateUserAddress(form) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.aUser.uid}`);
        const data: User = {
            uid: this.aUser.uid,
            email: this.aUser.email,
            displayName: this.aUser.displayName,
            adresses: [{
                personName: form.personName,
                type: form.type,
                postalCode: form.postalCode,
                addressLine: form.addressLine,
                number: form.number,
                complement: form.complement,
                reference: form.reference,
                district: form.district,
                city: form.city,
                state: form.state
            }]
        };

        userRef.update(data).
            then(() => {
                // update successful (document exists)
            })
            .catch((error) => {
                // (document does not exists)
                userRef.set(data);
            });
    }

}
