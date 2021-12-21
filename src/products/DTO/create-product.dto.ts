import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class ProductsCharasteristicsDto{
    @IsString()
    name: string;

    @IsString()
    value: string;
}

export class CreateProductDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly price: number;

    @IsString()
    readonly image: string;

    @IsOptional()
    @IsNumber()
    readonly oldPrice?: number;

    @IsNumber()
    readonly credit: number;

    @IsString()
    readonly description: string;

    @IsString()
    readonly advantages: string;

    @IsString()
    readonly disAdvantages: string;

    @IsArray()
    @IsString({each: true})
    readonly categories: string[];

    @IsArray()
    @IsString({each: true})
    readonly tags: string[];

    @IsArray()
    @ValidateNested()
    @Type(() => ProductsCharasteristicsDto)
    readonly characteristics: ProductsCharasteristicsDto[];
}