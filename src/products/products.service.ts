import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './DTO/create-product.dto';
import {Product} from './schemas/product.schema';
import {ModelType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";
import {FindProductDto} from "./DTO/find-product.dto";
import {Review} from "../review/schemas/review.schema";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productModel: ModelType<Product>) {
    }

    private products = [];

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        return this.productModel.create(productDto);
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, productDto: CreateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true}).exec();
    }

    async findWithReview(dto: FindProductDto) {
        return this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    reviewCount: {$size: '$review'},
                    reviewAvg: {$avg: '$review.rating'}
                }
            }
        ]).exec();
    }
}
