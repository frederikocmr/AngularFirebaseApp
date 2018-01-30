import { Product } from '../models/product.model';

export class Cart {
    public itens: {product: Product, quantity: number}[];

    constructor(itens: {product: Product, quantity: number}[]) {
       this.itens = itens;
    }
}
