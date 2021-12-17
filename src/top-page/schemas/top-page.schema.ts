import {TopLevelCategory} from "../DTO/create-top-page.dto";
import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {prop} from "@typegoose/typegoose";

export class HHData{
    @prop()
    count: number;

    @prop()
    juniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;
}

export class TopPageAdvantage{
    @prop()
    title: string;

    @prop()
    description: string
}

export interface TopPage extends Base {}
export class TopPage extends TimeStamps{
    @prop({enum: TopLevelCategory})
    firstCategory: TopLevelCategory;

    @prop()
    secondCategory: string;

    @prop()
    title: string;

    @prop()
    category: string;

    @prop({type: () => HHData})
    hh?: HHData;

    @prop({type: () => [TopPageAdvantage]})
    adventages: TopPageAdvantage[];

    @prop()
    seoText: string;

    @prop({type: () => [String]})
    tags: string[];

    @prop()
    tagsTitle: string;
}
