import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ShoppingCart } from '../../../shared/models/cart.model';
import { CartItem } from '../../../shared/models/cart-item.model';
import { Product } from '../../../shared/models/product.model';
import { DeliveryOption } from '../../../shared/models/delivery-option.model';

import { DeliveryOptionsDataService } from '../../../shared/services/delivery-options.service';
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../shared/interfaces/user.interface';
import { TransactionService } from '../transaction.service';

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

  @ViewChild('myModal') myModal;

  public adressLine: string;
  public contactName: string;
  public validInfo: boolean;
  public optionChecked = false;

  public checkoutForm: FormGroup;
  public showCitySelect: boolean;
  public confirmCityForm: FormGroup;

  private productsString = '';
  private products: Product[];
  private cartSubscription: Subscription;
  private userSubs: Subscription;
  private deliverySubs: Subscription;
  private deliveryOptionId: string;

  constructor(
    private productsService: ProductService,
    private deliveryOptionService: DeliveryOptionsDataService,
    private shoppingCartService: CartService,
    private authService: AuthService,
    private trService: TransactionService) { }

  public ngOnInit(): void {

    // tirar esse Form, pegar o payment_option pelo atributo do cart igual pega o id do metodo pagamento
    this.checkoutForm = new FormGroup(
      {
        'payment_option': new FormControl('Dinheiro')
      }
    );

    this.confirmCityForm = new FormGroup(
      {
        'city_option': new FormControl('')
      }
    );

    this.userSubs = this.authService.user.subscribe(
      (user) => {
        if (user.adresses[0].postalCode !== 0) {
          this.validInfo = true;

          const address = user.adresses[0];
          this.contactName = address.personName;

          this.adressLine = address.addressLine + ', ' +
            address.complement + ', nº ' +
            address.number + ', ' +
            address.district + ', ' +
            address.city + ' - ' +
            address.state + ' / CEP: ' +
            address.postalCode;

          this.trService.setUser(user);
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
        this.productsString = '';
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.productId);
            this.productsString += (product.name) + ' (' + item.quantity + ' ' + (product.measure) + ') ';
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });

      this.deliverySubs = this.deliveryOptions.subscribe((opt) => {
        this.trService.setDeliveryOption(
          (opt.find((p) => p.id === cart.deliveryOptionId)) !== undefined ?
            (opt.find((p) => p.id === cart.deliveryOptionId)).name : '');
      });

      if (cart.deliveryOptionId) {
        this.optionChecked = true;
        this.deliveryOptionId = cart.deliveryOptionId;
        this.showCityConfirmation();
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
    if (this.deliverySubs) {
      this.deliverySubs.unsubscribe();
    }
  }

  public showCityConfirmation() {
    if (this.deliveryOptionId === 'caa93bc4-d69a-4788-aff6-4a6fb538ace8') {
      this.showCitySelect = true;
    } else {
      this.showCitySelect = false;
    }
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
    this.deliveryOptionId = option.id;
    this.optionChecked = true;
    this.trService.setDeliveryOption(option.name);
    this.showCityConfirmation();
  }

  public openModal(): void {
    if (this.optionChecked) {
      if (!this.shoppingCartService.checkPrice() &&
        this.deliveryOptionId === 'caa93bc4-d69a-4788-aff6-4a6fb538ace8') {
        alert('IMPOSSÍVEL CONTINUAR: \nPois a quantidade mínima para realizar a entrega é de R$ 200 em pedido!');

      } else if (this.confirmCityForm.get('city_option').value === '' &&
        this.deliveryOptionId === 'caa93bc4-d69a-4788-aff6-4a6fb538ace8') {
        alert('IMPOSSÍVEL CONTINUAR: \nVocê deve confirmar a cidade (no novo campo abaixo do endereço) para entrega em domicílio!. ');

      } else if (this.confirmCityForm.get('city_option').value === 'outra' &&
        this.deliveryOptionId === 'caa93bc4-d69a-4788-aff6-4a6fb538ace8') {
        alert('IMPOSSÍVEL CONTINUAR: \nAtualmente fazemos entrega somente nas cidades de Goiânia' +
          'Aparecida de Goiânia e Piracanjuba. \n Pedimos desculpas pelo transtorno! ');

      } else {
        this.myModal.open();
        this.trService.setPayment(this.checkoutForm.get('payment_option').value);
        this.trService.setItensString(this.productsString);
      }
    } else {
      alert('É necessário escolher um método de entrega antes de continuar');
    }
  }

}
