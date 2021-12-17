import {prop} from "@typegoose/typegoose";
import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export interface Review extends Base {}
export class Review extends TimeStamps{
    @prop()
    name: string;

    @prop()
    title: string;

    @prop()
    description: string;

    @prop()
    rating: number;

    @prop()
    productId: string;
}
