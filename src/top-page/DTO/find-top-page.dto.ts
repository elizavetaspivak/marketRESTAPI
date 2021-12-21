import {TopLevelCategory} from "./create-top-page.dto";
import {IsEnum} from "class-validator";

export class FindTopPageDto {
    @IsEnum(TopLevelCategory)
    readonly firstCategory: TopLevelCategory;
}