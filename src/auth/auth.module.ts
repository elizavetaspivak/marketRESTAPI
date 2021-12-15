import {Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from '@nestjs/mongoose';
import {Auth, AuthSchema} from "./auth-schemas/auth.schema";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
    ],
})
export class AuthModule {}
