import {AuthService} from "./auth.service";
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {CreateAuthDto} from "./DTO/create-auth.dto";
import {Auth} from "./schemas/auth.schema";
import {ALREADY_REGISERED_ERROR} from "./auth.constants";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('login')
    @HttpCode(200)
    async login(@Body() createProductDto: CreateAuthDto) {
        const {email} = await this.authService.validateUser(createProductDto.email, createProductDto.password);
        return this.authService.loginUser(email);
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    async create(@Body() createAuthDto: CreateAuthDto) {
        const oldUser = await this.authService.findUser(createAuthDto.email);
        if(oldUser){
            throw new BadRequestException(ALREADY_REGISERED_ERROR);
        }
        return this.authService.register(createAuthDto);
    }

    @Delete('logout/:id')
    async remove(@Param('id') id: string) {
        return this.authService.logout(id);
    }
}
