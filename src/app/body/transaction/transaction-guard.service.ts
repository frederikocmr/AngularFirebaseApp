import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TransactionRouteGuard implements CanActivate {
    public constructor(private router: Router, private authService: AuthService, private shoppingCartService: CartService) { }

    public canActivate(): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            let toReturn: boolean;
            const cartSubscription = this.shoppingCartService
                .get()
                .subscribe((cart) => {
                    if (cart.items.length === 0) {
                        toReturn = false;
                    } else {
                        toReturn = true;
                    }
                });

            if (toReturn && this.authService.isAuthenticated()) {
                toReturn = true;
            } else {
                // alert('O usuário precisa estar logado para continuar!');
                this.router.navigate(['/carrinho']);
                toReturn = false;
            }

            observer.next(toReturn);

            return () => cartSubscription.unsubscribe();
        });
    }
}
