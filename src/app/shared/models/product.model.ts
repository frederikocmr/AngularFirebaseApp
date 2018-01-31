export class Product {
    public id: number;
    public name: string;
    public description: string;
    public value: number;
    public value2: number;
    public measure: string;
    public img: string;
    public categoryPath: string;

    constructor(
        id: number,
        name: string,
        description: string,
        value: number,
        value2: number,
        measure: string,
        img: string,
        categoryPath: string) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.value = value;
        this.value2 = value2;
        this.img = img;
        this.categoryPath = categoryPath;
        this.measure = measure;
    }
}
