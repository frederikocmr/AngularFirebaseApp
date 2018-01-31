import { Category } from '../models/category.model';

export class CategoryService {
    private category: Category[] = [
        new Category(
            1,
            'Categoria 1',
            'Produtos como banha de porco, tolcinho e conservas.',
            'tipo1',
            '/assets/images/background/basn.jpg'
        ),
        new Category(
            2,
            'Categoria 2',
            'Linguiças de vários tipos, com queijo, jiló e outros.',
            'tipo2',
            '/assets/images/background/sausages.jpg'
        ),
        new Category(
            3,
            'Categoria 3',
            'Aqui você encontrará filé, picanha, etc.',
            'tipo3',
            '/assets/images/background/pork.jpg'
        )
    ];

    getCategories() {
        return this.category.slice();
    }
    getCategoryByPath(value: string) {
        let result: Category[];
        result = this.category.filter(function (o) { return o.path === value; });

        return result.slice()[0];
    }
}
