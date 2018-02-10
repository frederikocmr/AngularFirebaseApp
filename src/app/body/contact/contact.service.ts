import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable()
export class ContactService {
    constructor(private afs: AngularFirestore) { }

    public checkUserData(form): void {
        if (form !== undefined) {
            this.updateUserData(form);
        }
    }

    private updateUserData(form): void {

        let currentTimestamp = '@' + Date.now();
        currentTimestamp = currentTimestamp + '-' + form.email;
        form.fid = currentTimestamp;
        form.date = Date();

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`contactForms/${currentTimestamp}`);

        userRef.set(form).
            then((ok) => {
                console.log(ok);
            })
            .catch((error) => {
                console.log(error);
            });

    }

}
