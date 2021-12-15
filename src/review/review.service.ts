import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Auth, AuthDocument} from "../../dist/auth/schemas/auth.schema";
import {CreateAuthDto} from "../../dist/auth/DTO/create-auth.dto";
import {Review, ReviewDocument} from "./schemas/review.schema";
import {CreateReviewDto} from "./DTO/create-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}
  private review = [];

  async getByProduct(productId: string): Promise<Review> {
    return this.reviewModel.findById(productId).exec();
  }

  async create(reviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(reviewDto);
  }

  async delete(id: string): Promise<Review> {
    return this.reviewModel.findByIdAndRemove(id);
  }
}
