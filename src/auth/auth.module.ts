import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {Auth} from "./schemas/auth.schema";
import {TypegooseModule} from "nestjs-typegoose";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../configs/jwt.config";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        TypegooseModule.forFeature([{
            typegooseClass: Auth,
            schemaOptions: {
                collection: 'Auth'
            }
        }]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        PassportModule
    ],
})
export class AuthModule {
}
