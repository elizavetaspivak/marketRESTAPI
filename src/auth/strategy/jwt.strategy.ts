import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {Auth} from "../schemas/auth.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate({email}: Pick<Auth, 'email'>){
        return email;
    }
}