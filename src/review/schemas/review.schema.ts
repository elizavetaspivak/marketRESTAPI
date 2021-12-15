import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop()
    createAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
