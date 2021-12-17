import {IsString} from "class-validator";

export class CreateAuthDto {
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}