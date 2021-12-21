import {IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class HHDataDTO{
    @IsNumber()
    count: number;

    @IsNumber()
    juniorSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;
}

export class TopPageAdvantageDTO{
    @IsString()
    title: string;

    @IsString()
    description: string
}

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class CreateTopPageDto {
    @IsEnum(TopLevelCategory)
    readonly firstCategory: TopLevelCategory;

    @IsString()
    readonly secondCategory: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => HHDataDTO)
    readonly hh?: HHDataDTO;

    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantageDTO)
    readonly adventages: TopPageAdvantageDTO[];

    @IsString()
    readonly seoText: string;

    @IsArray()
    @IsString({each: true})
    readonly tags: string[];

    @IsString()
    readonly tagsTitle: string;
}