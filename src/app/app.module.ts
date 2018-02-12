import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StickyNavModule } from 'ng2-sticky-nav';
import { ModalModule } from 'ngx-modal';
// import { FacebookModule } from 'ngx-facebook'; //necessario?

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';

import { HomeComponent } from './body/home/home.component';
import { AboutComponent } from './body/about/about.component';
import { StoreComponent } from './body/store/store.component';
import { ContactComponent } from './body/contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CategoryComponent } from './body/store/category/category.component';
import { ProductComponent } from './body/store/category/product/product.component';
import { ProductItemComponent } from './body/store/category/product/product-item/product-item.component';

import { SigninComponent } from './body/auth/signin/signin.component';
import { SignupComponent } from './body/auth/signup/signup.component';
import { CartComponent } from './body/transaction/cart/cart.component';
import { CheckoutComponent } from './body/transaction/checkout/checkout.component';
import { OrderConfirmationComponent } from './body/transaction/order-confirmation/order-confirmation.component';

import { AuthService } from './body/auth/auth.service';
import { AuthGuard } from './body/auth/auth-guard.service';
import { TransactionRouteGuard } from './body/transaction/transaction-guard.service';

import { CartService } from './shared/services/cart.service';
import { UIService } from './shared/services/UI.service';
import { UserAccountService } from './body/user-account/user-account.service';

import { UserAccountComponent } from './body/user-account/user-account.component';
import { ProfileInfoComponent } from './body/user-account/profile-info/profile-info.component';
import { AddressesComponent } from './body/user-account/addresses/addresses.component';
import { OrdersComponent } from './body/user-account/orders/orders.component';
import { ProductService } from './shared/services/product.service';

import { LocalStorageServie, StorageService } from './shared/services/storage.service';
import { DeliveryOptionsDataService } from './shared/services/delivery-options.service';
import { TransactionService } from './body/transaction/transaction.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    AboutComponent,
    StoreComponent,
    ContactComponent,
    PageNotFoundComponent,
    CategoryComponent,
    ProductComponent,
    ProductItemComponent,
    SigninComponent,
    SignupComponent,
    CartComponent,
    UserAccountComponent,
    ProfileInfoComponent,
    AddressesComponent,
    OrdersComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StickyNavModule,
    AppRoutingModule,
    HttpModule,
    ModalModule
    // FacebookModule.forRoot()
  ],
  providers: [
    CartService,
    AuthService,
    AuthGuard,
    TransactionRouteGuard,
    UIService,
    UserAccountService,
    ProductService,
    DeliveryOptionsDataService,
    TransactionService,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie },
    {
      deps: [StorageService, ProductService, DeliveryOptionsDataService],
      provide: CartService,
      useClass: CartService
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
