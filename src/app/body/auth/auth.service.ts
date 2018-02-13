import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CartService } from '../../shared/services/cart.service';
import { UIService } from '../../shared/services/UI.service';
import { User } from '../../shared/interfaces/user.interface';

// verificar erros / codigos em: https://firebase.google.com/docs/auth/admin/errors?hl=en

@Injectable()
export class AuthService {
    private token: string;
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
        let data: User;
        if (form) {
            data = {
                uid: user.uid,
                email: form.email,
                displayName: form.name,
                phoneNumber: form.phoneNumber,
                document: form.document,
                birthDate: form.birthDate,
                gender: form.gender,
                adresses: [{
                    personName: '',
                    type: '',
                    postalCode: 0,
                    addressLine: '',
                    number: '',
                    complement: '',
                    reference: '',
                    district: '',
                    city: '',
                    state: ''
                }]
            };
        } else {
            data = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                gender: (user.gender === 'male' ? 'm' : (user.gender === 'female' ? 'f' : ''))
            };
        }

        userRef.update(data).
            then(() => {
                // update successful (document exists)
            })
            .catch((error) => {
                // (document does not exists)
                data.adresses = [{
                    personName: '',
                    type: '',
                    postalCode: 0,
                    addressLine: '',
                    number: '',
                    complement: '',
                    reference: '',
                    district: '',
                    city: '',
                    state: ''
                }];
                userRef.set(data);
            });

    }

    recoverPassword(email: string) {
        let msg = '';
        this.afAuth.auth.sendPasswordResetEmail(email).then((ok) => {
            msg = 'Mensagem de recuperação de senha enviada para o email "' + email + '" com sucesso!';
            alert(msg);
        }).catch((error) => {
            msg = error.message;
            alert((error.code === 'auth/user-not-found' ? 'Usuário não encontrado para este email!' : msg));
        });
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/entrar']);
        });
    }
}
