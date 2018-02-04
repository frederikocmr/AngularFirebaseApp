import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ShoppingCart } from '../../../shared/models/cart.model';
import { CartItem } from '../../../shared/models/cart-item.model';
import { Product } from '../../../shared/models/product.model';
import { DeliveryOption } from '../../../shared/models/delivery-option.model';

import { DeliveryOptionsDataService } from '../../../shared/services/delivery-options.service';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../shared/interfaces/user.interface';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  private products: Product[];
  private cartSubscription: Subscription;

  @ViewChild('myModal') myModal;

  public adressLine: string;
  public contactName: string;
  private userSubs: Subscription;
  public validInfo: boolean;
  public optionChecked = false;


  constructor(
    private productsService: ProductService,
    private deliveryOptionService: DeliveryOptionsDataService,
    private shoppingCartService: CartService,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(
      (user) => {
        if (user.adresses[0].postalCode !== 0) {
          this.validInfo = true;

          const address = user.adresses[0];
          this.contactName = address.personName;

          this.adressLine = address.addressLine + ', ' +
            address.complement + ', ' +
            address.type + ', nº ' +
            address.number + ', ' +
            address.district + ', ' +
            address.city + ' - ' +
            address.state + ' * CEP: ' +
            address.postalCode;

        } else {
          this.validInfo = false;
          this.adressLine = 'Nenhum endereço cadastrado!';
          this.contactName = 'Nenhum contato cadastrado!';
        }


      },
      (error) => {
        console.log(error);
      }
    );

    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });

      if (cart.deliveryOptionId) {
        this.optionChecked = true;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
    this.optionChecked = true;
  }

  public openModal(): void {
    if (this.optionChecked) {
      this.myModal.open();
    } else {
      alert('É necessário escolher um método de entrega antes de continuar');
    }
  }

}
