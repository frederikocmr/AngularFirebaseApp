import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
    private productsCollection: AngularFirestoreCollection<Product>;
    private products: Observable<Product[]>;

    public constructor(private afs: AngularFirestore) { }

    public all(): Observable<Product[]> {
        this.productsCollection = this.afs.collection<Product>('products');
        this.products = this.productsCollection.valueChanges();
        return this.products;
    }

}
