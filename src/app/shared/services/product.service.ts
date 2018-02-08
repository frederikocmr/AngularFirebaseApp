import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Product } from '../models/product.model';
import { CachingServiceBase } from './caching.service';

// tslint:disable-next-line:prefer-const
let count = 0;

@Injectable()
export class ProductService extends CachingServiceBase {
    private products: Observable<Product[]>;

    public constructor(private http: Http) {
        super();
    }

    public all(): Observable<Product[]> {
        return this.cache<Product[]>(() => this.products,
            (val: Observable<Product[]>) => this.products = val,
            () => this.http
                .get('./assets/json/products.json')
                .map((response) => response.json()
                    .map((item) => {
                        const model = new Product();
                        model.updateFrom(item);
                        return model;
                    })));

    }
}
