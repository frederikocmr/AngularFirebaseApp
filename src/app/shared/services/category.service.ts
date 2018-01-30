import { Category } from "../models/category.model";

export class CategoryService {
    private category: Category[] = [
        new Category(
            1,
            'Derivados do Porco',
            'Produtos como banha de porco, tolcinho e conservas.',
            'tipo1',
            '/assets/images/background/basn.jpg'
        ),
        new Category(
            2,
            'Linguiças',
            'Linguiças de vários tipos, com queijo, jiló e outros.',
            'tipo2',
            '/assets/images/background/sausages.jpg'
        ),
        new Category(
            3,
            'Carne de gado',
            'Aqui você encontrará filé, picanha, etc.',
            'tipo3',
            '/assets/images/background/pork.jpg'
        )
    ];

    getCategories() {
        return this.category.slice();
    }
    getCategoryByPath(value : string) {
        var result: Category[];
        result = this.category.filter(function (o) { return o.path == value; });
        
        return result.slice()[0];
    }
}