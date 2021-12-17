import {IsNumber, IsString, Max, Min} from 'class-validator'

export class CreateReviewDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @Max(5)
    @Min(1)
    @IsNumber()
    readonly rating: number;

    @IsString()
    readonly productId: string;
}