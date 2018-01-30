import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CartService } from '../../shared/services/cart.service';
import { UIService } from '../../shared/services/UI.service';

// verificar erros / codigos em: https://firebase.google.com/docs/auth/admin/errors?hl=en

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    phoneNumber?: string;
    document?: number;
    birthDate?: Date;
    gender?: string;
}

@Injectable()
export class AuthService {
    token: string;
    user: Observable<User>;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private cartService: CartService,
        private afs: AngularFirestore,
        private uiService: UIService
    ) {
        this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return Observable.of(null);
          }
        });
    }

    initAuthListener() {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    user.getIdToken().then(
                        (token: string) => this.token = token
                    );
                } else {
                    this.token = null;
                    this.cartService.cancelSubscriptions();
                }
            }
        );
    }

    signUpUser(form) {
        this.uiService.loadingStateChanged.next(true);

        this.afAuth.auth.createUserWithEmailAndPassword(
            form.email, form.password
        ).then(result => {
            this.updateUserData(result, form);
            this.uiService.errorMsgStateChanged.next('');
            this.uiService.loadingStateChanged.next(false);
            setTimeout(() => {
                this.router.navigate(['/minha-conta']);
            }, 1300);

        }).catch(error => {
            //  console.log(error);
            // alert(error.message);
            this.uiService.errorMsgStateChanged.next(error.message);
            this.uiService.loadingStateChanged.next(false);
        });
    }

    signInUser(email: string, password: string) {
        this.uiService.loadingStateChanged.next(true);
        this.uiService.errorMsgStateChanged.next('');

        this.afAuth.auth.signInWithEmailAndPassword(
            email, password
        ).then(result => {
            this.uiService.errorMsgStateChanged.next('');
            this.uiService.loadingStateChanged.next(false);
            setTimeout(() => {
                this.router.navigate(['/minha-conta']);
            }, 1300);
        }).catch(error => {
            //  console.log(error);
            // alert(error.message);
            this.uiService.errorMsgStateChanged.next(error.message);
            this.uiService.loadingStateChanged.next(false);
        });

    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
            (token: string) => this.token = token
            ).catch(error => {
                console.log(error);
            });

        return this.token;

        // tratar erro caso o usuario pega um token que venceu ou invalido
    }

    isAuthenticated() {
        return this.token != null;
    }

    googleLogin() {
        this.uiService.loadingStateChanged.next(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        this.uiService.loadingStateChanged.next(true);
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                credential.user.gender = credential.additionalUserInfo.profile.gender;
                this.updateUserData(credential.user);
                this.uiService.errorMsgStateChanged.next('');
                this.uiService.loadingStateChanged.next(false);
                setTimeout(() => {
                    this.router.navigate(['/minha-conta']);
                }, 1300);
            }).catch(error => {
                this.uiService.errorMsgStateChanged.next(error.message);
                this.uiService.loadingStateChanged.next(false);
            });
    }

    private updateUserData(user, form?) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: (form ? form.name : user.displayName),
            photoURL: user.photoURL,
            phoneNumber: (form ? form.phoneNumber : user.phoneNumber),
            document: (form ? form.document : ''),
            birthDate: (form ? form.birthDate : ''),
            gender: (form ? form.gender : user.gender)
        };
        return userRef.set(data);
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/entrar']);
        });
    }
}

/*
You can of course improve this app even more. Some ideas:

1 -> Check if a token is present at application startup (check the localStorage manually or use the Firebase SDK
    to do so - just make sure that you somehow wait for the SDK to finish its initialization)
2 ok -> Redirect the user if he want to access a protected route (right now, nothing happens)
    - inject the router and call this.router.navigate(...) to do so
3 -> Redirect the user on logout so that he's not able to stay on pages which are reserved for authenticated users
    - you can simply inject the router and call this.router.navigate(...) in the logout() method


    https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/questions/2418294

    https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/questions/2772818
*/
