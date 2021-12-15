import {Body, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";
import {ReviewService} from "./review.service";
import {CreateReviewDto} from "./DTO/create-review.dto";
import {Review} from "./schemas/review.schema";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {

    }

    @Get('byProduct/:productId')
    get(@Param('productId') productId:string): Promise<Review>{
        return this.reviewService.getByProduct(productId)
    }

    @Post()
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.create(createReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Review> {
        return this.reviewService.delete(id);
    }
}
