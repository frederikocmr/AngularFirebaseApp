import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../shared/services/product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Category } from '../../../../shared/models/category.model';
import { CategoryService } from '../../../../shared/services/category.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  categorySel: Category;
  category = '';
  private paramsSubscription: Subscription;
  public products: Observable<Product[]>;

  public constructor(
    private productsService: ProductService,
    private shoppingCartService: CartService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
  }

  public addProductToCart(itemData: { product: Product, quantity: number }): void {
    this.shoppingCartService.addItem(itemData.product, itemData.quantity);
    alert('Item adicionado ao carrinho com sucesso!\nItem: "' + itemData.product.name + '" \nQuantidade: ' + itemData.quantity);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.productId === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        this.categorySel = this.categoryService.getCategoryByPath(this.category);
      });
    this.products = this.productsService.all();
  }

  public ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

}
