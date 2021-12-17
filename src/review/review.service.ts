import {Injectable} from '@nestjs/common';
import {Review} from "./schemas/review.schema";
import {CreateReviewDto} from "./DTO/create-review.dto";
import {ModelType, DocumentType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review) private reviewModel: ModelType<Review>) {
    }

    private review = [];

    async getByProduct(productId: string): Promise<DocumentType<Review>[]> {
        return this.reviewModel.find({ productId: productId }).exec();
    }

    async create(reviewDto: CreateReviewDto): Promise<DocumentType<Review>> {
        return this.reviewModel.create(reviewDto);
    }

    async delete(id: string): Promise<DocumentType<Review> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async deleteByProductId(productId: string){
        return this.reviewModel.deleteMany({productId: productId}).exec();
    }
}
