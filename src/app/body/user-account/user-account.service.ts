import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { User } from '../../shared/interfaces/user.interface';

@Injectable()
export class UserAccountService {
    public aUser: User;
    private userSubs: Subscription;

    constructor(private authService: AuthService, private afs: AngularFirestore, private fb: FirebaseApp) { }

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


    public cancelOrder(order): void {
        const uniqueKey = this.aUser.uid + '-' + order.id;

        // para a collection orders

        const ordersRefs = this.afs.collection('orders').doc(uniqueKey);
        ordersRefs.update({ status: 5 }).then(() => { }).catch((error) => { });

        // para a o array orders que estao na collection users

        const docRef = this.fb.firestore().collection('users').doc(this.aUser.uid);
        const docRefSave = this.fb.firestore().collection('users').doc(this.aUser.uid);


        docRef.get().then((doc) => {
            if (doc.exists) {
                const docData = doc.data().orders;
                let i = docData.length;

                while (i--) {
                    if (order.id === docData[i].id) {
                        docData[i].status = 5;
                        break;
                    }
                }

                docRefSave.update({
                    orders: docData
                }).
                    then(() => {
                        // update successful (document exists)
                        alert('Status alterado com sucesso!');
                    })
                    .catch((error) => {
                        // (document does not exists)
                        console.log(error);

                    });


            } else {
                alert('Erro, tente novamente mais tarde ou contate o suporte!');
            }
        }).catch(function (error) {
            alert('Erro. Tente novamente mais tarde ou contate o suporte!');
        });

        // Melhorar: Criar uma subcolection dentro da collection users
    }

}
