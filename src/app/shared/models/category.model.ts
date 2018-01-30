export class Category {
    public id: number;
    public name: string;
    public description: string;
    public path: string;
    public img: string;

    constructor(id: number, name: string, description: string, path: string, img: string) {
        this.name = name;
        this.description = description;
        this.path = path;
        this.img = img;
    }
}
