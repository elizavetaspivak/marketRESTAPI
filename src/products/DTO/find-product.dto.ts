import {IsNumber, IsString} from "class-validator";

export class FindProductDto {
    @IsNumber()
    readonly limit: number;

    @IsString()
    readonly category: string;
}