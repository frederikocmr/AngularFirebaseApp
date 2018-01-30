import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { Product } from '../../../../shared/models/product.model';
import { Category } from '../../../../shared/models/category.model';
import { ProductService } from '../../../../shared/services/product.service';
import { CategoryService } from '../../../../shared/services/category.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CategoryService]
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[];
  categorySel: Category;
  category = '';
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    // verificar se a categoria é válida, se nao for mostra pagina inexistente
    // adicionar animação toda vez em qe mudar de categoria...
    this.category = this.route.snapshot.params['category'];
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.category = params['category'];
        // (depois) fazer testes no card quando é mobile
        // inserir total de produtos para cada categoria
        // toda vez que trocar a category, inserir animação nos itens do produtos de fade
        this.products = this.productService.getProductsByCategory(this.category);
        this.categorySel = this.categoryService.getCategoryByPath(this.category);
      }
    );


  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

  }

}
