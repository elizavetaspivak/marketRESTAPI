import { CreateProductDto } from './DTO/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    private products;
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    create(productDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    update(id: string, productDto: CreateProductDto): Promise<Product>;
}
