import {prop} from "@typegoose/typegoose";
import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

class ProductsCharasteristics{
    @prop()
    name: string;

    @prop()
    value: string;
}

export interface Product extends Base { }
export class Product extends TimeStamps{
    @prop()
    title: string;

    @prop()
    price: number;

    @prop()
    image: string;

    @prop()
    oldPrice?: number;

    @prop()
    credit: number;

    @prop()
    description: string;

    @prop()
    advantages: string;

    @prop()
    disAdvantages: string;

    @prop({type: () => [String]})
    categories: string[];

    @prop({type: () => [String]})
    tags: string[];

    @prop({type: () => [ProductsCharasteristics], _id: false})
    characteristics: ProductsCharasteristics[];
}
