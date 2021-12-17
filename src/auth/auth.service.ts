import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Auth} from "./schemas/auth.schema";
import {CreateAuthDto} from "./DTO/create-auth.dto";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";
import {compare, genSalt, hash} from "bcryptjs";
import {USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR} from "./auth.constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth) private authModel: ModelType<Auth>, private readonly jwtService: JwtService) {
    }

    async loginUser(email: string) {
        const payload = {email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async register(authDto: CreateAuthDto) {
        const salt = await genSalt(10);
        const newUser = new this.authModel({
            email: authDto.email,
            passwordHash: await hash(authDto.password, salt)
        });
        return newUser.save()
    }

    async logout(id: string) {
        return this.authModel.findByIdAndRemove(id);
    }

    async findUser(email: string) {
        return this.authModel.findOne({email}).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<Auth, 'email'>> {
        const user = await this.findUser(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return {email: user.email};
    }
}
