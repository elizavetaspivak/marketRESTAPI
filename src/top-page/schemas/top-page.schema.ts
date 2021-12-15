import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {TopLevelCategory} from "../DTO/create-top-page.dto";

export type TopPageDocument = TopPage & Document;

@Schema()
export class TopPage {
    @Prop()
    firstCategory: TopLevelCategory;

    @Prop()
    secondCategory: string;

    @Prop()
    title: string;

    @Prop()
    category: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    hh?: {
        count: number;
        juniorSalary: number;
        middleSalary: number;
        seniorSalary: number;
    };

    @Prop()
    adventages: {
        title: string;
        description: string
    }[];

    @Prop()
    seoText: string;

    @Prop()
    tags: string[];

    @Prop()
    tagsTitle: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
