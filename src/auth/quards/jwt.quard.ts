import {AuthGuard} from "@nestjs/passport";

export class JwtAuthQuard extends AuthGuard('jwt'){

}