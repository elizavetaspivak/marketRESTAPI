import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post, UseGuards,
    UsePipes, ValidationPipe
} from "@nestjs/common";
import {ReviewService} from "./review.service";
import {CreateReviewDto} from "./DTO/create-review.dto";
import {Review} from "./schemas/review.schema";
import {REVIEW_NOT_FOUND} from "./review.constants";
import {JwtAuthQuard} from "../auth/quards/jwt.quard";
import {UserEmail} from "../decorators/user-email.decorator";
import {TelegramService} from "../telegram/telegram.service";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService,
                private readonly telegramService: TelegramService) {
    }

    @UseGuards(JwtAuthQuard)
    @Get('byProduct/:productId')
    async get(@Param('productId') productId: string, @UserEmail() email: string) {
        return this.reviewService.getByProduct(productId)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    async create(@Body() createReviewDto: CreateReviewDto) {
        this.notify(createReviewDto);
        return this.reviewService.create(createReviewDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('notify')
    async notify(@Body() dto: CreateReviewDto) {
        const message = `Имя: ${dto.name}\n`
            + `Заголовок: ${dto.title}\n`
            + `Описание: ${dto.description}\n`
            + `Рейтинг: ${dto.rating}\n`
            + `ID: ${dto.productId}\n`;
        return this.telegramService.sendMessage(message);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @Delete('deleteByProductId/:id')
    async deleteByProductId(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.deleteByProductId(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }
}
