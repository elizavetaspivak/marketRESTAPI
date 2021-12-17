import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ReviewService} from "./review.service";
import {ReviewController} from "./review.controller";
import {Review, ReviewSchema} from "./schemas/review.schema";

@Module({
    providers: [ReviewService],
    controllers: [ReviewController],
    imports: [
        MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}]),
    ],
})
export class ReviewModule {}
