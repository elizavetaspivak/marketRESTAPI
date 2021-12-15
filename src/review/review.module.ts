import { Module } from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {AuthController} from "../auth/auth.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Auth, AuthSchema} from "../auth/auth-schemas/auth.schema";
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
