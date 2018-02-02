export class Product {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public measure: string;
    public img: string;
    public categoryPath: string;

    public updateFrom(src: Product): void {
        this.id = src.id;
        this.name = src.name;
        this.description = src.description;
        this.price = src.price;
        this.img = src.img;
        this.categoryPath = src.categoryPath;
        this.measure = src.measure;
    }
}
