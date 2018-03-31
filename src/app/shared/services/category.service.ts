import { Category } from '../models/category.model';

export class CategoryService {
    private category: Category[] = [
        new Category(
            1,
            'Linguiças Tradicionais',
            'Linguiças deliciosas temperadas com alho e sal, acompanhando pimenta ou não.',
            'linguicas-tradicionais',
            '/assets/images/background/tradicionais-min.JPG'
        ),
        new Category(
            2,
            'Linguiças Recheadas',
            'Linguiças de vários recheios, como pimenta Biquinho, queijo, jiló e azeitona.',
            'linguicas-recheadas',
            '/assets/images/background/especiais-min.JPG'
        ),
        new Category(
            3,
            'Derivados Suínos na Lata',
            'Produtos como banha de porco na lata e carne suína de extremo sabor e qualidade.',
            'derivados-suinos',
            '/assets/images/background/derivados-suinos-min.JPG'
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
