import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';


@Injectable()
export class UserAccountService {
    private userId: string;
    private userSubs: Subscription;

    constructor(private authService: AuthService) { }

    initUserListener() {
        if (this.authService.user && !this.userSubs) {
            this.userSubs = this.authService.user.subscribe(
                (user) => {
                    this.userId = user.uid;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    destroyUserListener() {
        if (this.userSubs) {
            this.userSubs.unsubscribe();
        }
    }

}
