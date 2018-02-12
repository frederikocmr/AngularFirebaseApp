import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './body/home/home.component';
import { StoreComponent } from './body/store/store.component';
import { ProductComponent } from './body/store/category/product/product.component';
import { AboutComponent } from './body/about/about.component';
import { ContactComponent } from './body/contact/contact.component';
import { SigninComponent } from './body/auth/signin/signin.component';
import { SignupComponent } from './body/auth/signup/signup.component';
import { CartComponent } from './body/transaction/cart/cart.component';
import { ProfileInfoComponent } from './body/user-account/profile-info/profile-info.component';
import { AddressesComponent } from './body/user-account/addresses/addresses.component';
import { OrdersComponent } from './body/user-account/orders/orders.component';
import { UserAccountComponent } from './body/user-account/user-account.component';
import { CheckoutComponent } from './body/transaction/checkout/checkout.component';
import { OrderConfirmationComponent } from './body/transaction/order-confirmation/order-confirmation.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './body/auth/auth-guard.service';
import { TransactionRouteGuard } from './body/transaction/transaction-guard.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'loja', component: StoreComponent,
        children: [
            { path: ':category', component: ProductComponent }
        ]
    },
    { path: 'sobre', component: AboutComponent },
    { path: 'contato', component: ContactComponent },
    { path: 'entrar', component: SigninComponent },
    { path: 'cadastro', component: SignupComponent },
    { path: 'carrinho', component: CartComponent },
    {
        path: 'minha-conta', component: UserAccountComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: ProfileInfoComponent },
            { path: 'dados', component: ProfileInfoComponent },
            { path: 'enderecos', component: AddressesComponent },
            { path: 'pedidos', component: OrdersComponent },
        ]
    },
    { path: 'checkout', component: CheckoutComponent, canActivate: [TransactionRouteGuard] },
    { path: 'checkout-sucesso', component: OrderConfirmationComponent, canActivate: [TransactionRouteGuard] },
    { path: 'politica-privacidade', component: PrivacyPolicyComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
