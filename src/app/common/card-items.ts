import { Product } from "./product";

export class CardItems {
            id:number;
            name:string;
            imageUrl: string;
            unitePrice: number;
            quantity:number;

    constructor(products:Product){
    this.id=products.id;
    this.name=products.name;
    this.imageUrl=products.image_url;
    this.unitePrice=products.unit_price;
    this.quantity=1;
    }

}
