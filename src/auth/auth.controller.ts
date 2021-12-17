import {AuthService} from "./auth.service";
import {Body, Controller, Delete, Header, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {CreateAuthDto} from "./DTO/create-auth.dto";
import {Auth} from "./schemas/auth.schema";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('login')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    login(@Body() createProductDto: CreateAuthDto): Promise<Auth> {
        return this.authService.login(createProductDto);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateAuthDto): Promise<Auth> {
        return this.authService.register(createProductDto);
    }

    @Delete('logout/:id')
    remove(@Param('id') id: string): Promise<Auth> {
        return this.authService.logout(id);
    }
}
