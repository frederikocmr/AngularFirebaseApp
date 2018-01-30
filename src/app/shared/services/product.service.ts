import { Product } from "../models/product.model";

export class ProductService {
    private products: Product[] = [
        new Product(
            1,
            'Produto 1',
            'Produto descricao',
            10,
            0,
            'kg',
            'http://placehold.it/500x400',
            'tipo1'
        ),
        new Product(
            2,
            'Produto 2',
            'Produto descricao',
            20,
            0,
            'kg',
            'http://placehold.it/500x400',
            'tipo1'
        ),
        new Product(
            3,
            'Produto 3',
            'Produto descricao',
            30,
            0,
            'kg',
            'http://placehold.it/500x400',
            'tipo1'
        ),
        new Product(
            4,
            'Produto 4',
            'Produto descricao',
            40,
            0,
            'kg',
            'http://placehold.it/500x400',
            'tipo1'
        ),
        new Product(
            1,
            'Produto 5',
            'Produto descricao',
            10,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo2'
        ),
        new Product(
            2,
            'Produto 6',
            'Produto descricao',
            20,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo2'
        ),
        new Product(
            3,
            'Produto 7',
            'Produto descricao',
            30,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo2'
        ),
        new Product(
            4,
            'Produto 8',
            'Produto descricao',
            40,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo2'
        ),
        new Product(
            1,
            'Produto 9',
            'Produto descricao',
            10,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo3'
        ),
        new Product(
            2,
            'Produto 10',
            'Produto descricao',
            20,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo3'
        ),
        new Product(
            3,
            'Produto 11',
            'Produto descricao',
            30,
            0,
            'un',
            'http://placehold.it/500x400',
            'tipo3'
        ),
        new Product(
            4,
            'Produto 12',
            'Produto descricao',
            40,
            20,
            'un',
            'http://placehold.it/500x400',
            'tipo3'
        ),
        new Product(
            4,
            'Produto 13',
            'Produto descricao',
            40,
            20,
            'un',
            'http://placehold.it/500x400',
            'tipo3'
        )
    ];

    getProducts() {
        return this.products.slice();
    }

    getProductsByCategory(value: string) {
        var result: Product[];
        result = this.products.filter(function (o) { return o.categoryPath == value; });
        
        return result.slice(); // ou nada se nao tiver com este valor
    }
}