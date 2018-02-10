import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { UserAccountService } from '../user-account/user-account.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../../shared/interfaces/user.interface';

import { FirebaseApp } from 'angularfire2';

@Injectable()
export class TransactionService {
    public user;
    public itensString: string;
    public paymentMethod: string;
    public deliveryOpt: string;
    private userSubs: Subscription;

    constructor(private fb: FirebaseApp) {
    }

    public setUser(user): void {
        this.user = user;
    }

    public setPayment(paymentMethod): void {
        this.paymentMethod = paymentMethod;
    }

    public setDeliveryOption(deliveryOpt): void {
        this.deliveryOpt = deliveryOpt;
    }

    public setItensString(itensString): void {
        this.itensString = itensString;
    }

    public createNewOrder(grossTotal): void {
        const ordersRefs = this.fb.firestore().collection('users').doc(this.user.uid);
        this.fb.firestore().runTransaction(transaction => {
            return transaction.get(ordersRefs).then(valuesRef => {
                let ordersArray;
                const dateS = new Date();
                const address = this.user.adresses[0];

                const valuesToInsert = {
                    address: address.addressLine + ', ' +
                        address.complement + ', ' +
                        address.type + ', nº ' +
                        address.number + ', ' +
                        address.district + ', ' +
                        address.city + ' - ' +
                        address.state + ' / CEP: ' +
                        address.postalCode,
                    contactName: this.user.adresses[0].personName,
                    deliveryOption: this.deliveryOpt,
                    itens: this.itensString,
                    paidValue: grossTotal,
                    paymentMethod: this.paymentMethod,
                    date: dateS.toISOString(),
                    status: '1'
                };

                if (valuesRef.data().orders !== undefined) {
                    ordersArray = valuesRef.data().orders;
                    ordersArray.push(valuesToInsert);
                } else {
                    ordersArray = [valuesToInsert];
                }
                this.createNewOrderDocument(valuesToInsert);
                transaction.update(ordersRefs, { orders: ordersArray });
            });
        });
    }


    private createNewOrderDocument(values): void {
        const dateNow = Date.now();
        const uniqueKey = this.user.uid + '-' + dateNow;

        values.email = this.user.email;
        values.document = (this.user.document ? this.user.document : 'Sem registro');
        values.id = dateNow;

        const ordersRefs = this.fb.firestore().collection('orders').doc(uniqueKey);

        ordersRefs.set(values).
            then(() => {
                // update successful (document exists)
            })
            .catch((error) => {
                // (document does not exists)
                console.log(error);
            });
    }
}
