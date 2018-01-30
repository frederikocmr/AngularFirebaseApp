import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { UIService } from './UI.service';


@Injectable()
export class CartService {

    cartChanged = new Subject<Cart[]>();
    private cart: Cart[] = [];
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) { }

    fecthCart() {
        this.uiService.loadingStateChanged.next(true);

        this.fbSubs.push(this.db
            .collection('cart-1')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        itens: doc.payload.doc.data().itens
                    };
                });
            })
            .subscribe((carts: Cart[]) => {
                this.cart = carts;
                this.cartChanged.next([...this.cart]);
                this.uiService.loadingStateChanged.next(false);
            }, error => {
                this.uiService.loadingStateChanged.next(false);
                alert('Ocorreu um erro ao carregar o carrinho, por favor, contate o suporte! ERRO:' + error);
            }));
    }

    cancelSubscriptions() {
        if (this.fbSubs) {
            this.fbSubs.forEach(
                sub => sub.unsubscribe()
            );
        }

    }

    // private cart: Cart[] =
    //     [
    //         new Cart(
    //             1,
    //             [{
    //                 product: new Product(
    //                     1,
    //                     'Produto 1',
    //                     'Produto descricao',
    //                     10,
    //                     10,
    //                     'kg',
    //                     'http://placehold.it/500x400',
    //                     'tipo1'),
    //                 quantity: 3
    //             },
    //             {
    //                 product: new Product(
    //                     1,
    //                     'Produto 1',
    //                     'Produto descricao',
    //                     10,
    //                     22,
    //                     'kg',
    //                     'http://placehold.it/500x400',
    //                     'tipo1'),
    //                 quantity: 1
    //             }],
    //             1
    //         )
    //     ];


    // // carregar de cookies e firebase conta
    // // fazer testes carrinho com id e sem id, cheio e vazio

    // addCart(cart: Cart) {

    //     // checa para ver se existe um carrrinho para aquela pessoa
    //     // se nao existir, cria um. Se existir, adiciona o objeto Produto e Quantidade no mesmo
    //     this.cart.push(cart);
    // }

    // addToCart(prod: Product, qty: number, userId: number) {
    //     if (this.getCartByUser(userId) !== undefined) {
    //         this.getCartIdByUser(userId);
    //     }

    // }

    getCart() {
        return this.cart.slice;
    }

    // getCartByUser(value: number) {
    //     if (this.cart) {
    //         let result: Cart[];
    //         result = this.cart.filter(function (o) { return o.userId === value; });

    //         return result.slice()[0];
    //     } else {
    //         return undefined;
    //     }
    // }

    // getCartIdByUser(value: number) {

    //     let result: Cart[];
    //     let resultObj: Cart;
    //     result = this.cart.filter(function (o) { return o.userId === value; });
    //     resultObj = result.slice()[0];

    //     return resultObj.id;
    // }

}
