import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.authService.isAuthenticated();

        if (this.authService.isAuthenticated()) {
            return true;
        }
        alert('O usuário precisa estar logado para acessar essa página! Verifique e tente novamente.');
        this.router.navigate(['/entrar']); // com query params para mostrar mensagem de acesso somente logado
        return false;
    }
}
