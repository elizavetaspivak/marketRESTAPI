import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    image: string;

    @Prop()
    oldPrice: number;

    @Prop()
    credit: number;

    @Prop()
    calculatedRating: number;

    @Prop()
    description: string;

    @Prop()
    advantages: string;

    @Prop()
    disAdvantages: string;

    @Prop({type: [String]})
    categories: string[];

    @Prop()
    tags: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    characteristics: {
        [key: string]: string;
    };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
