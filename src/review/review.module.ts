import { Module } from '@nestjs/common';
import {ReviewService} from "./review.service";
import {ReviewController} from "./review.controller";
import {Review} from "./schemas/review.schema";
import {TypegooseModule} from "nestjs-typegoose";

@Module({
    providers: [ReviewService],
    controllers: [ReviewController],
    imports: [
        TypegooseModule.forFeature([{
            typegooseClass: Review,
            schemaOptions: {
                collection: 'Review'
            }
        }]),
    ],
})
export class ReviewModule {}
