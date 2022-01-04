import {HHDataDTO, TopLevelCategory, TopPageAdvantageDTO} from "./create-top-page.dto";
import {IsArray, IsEnum, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class UpdateTopPageDto {
    @IsEnum(TopLevelCategory)
    readonly firstCategory: TopLevelCategory;

    @IsString()
    readonly secondCategory: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly alias: string;

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