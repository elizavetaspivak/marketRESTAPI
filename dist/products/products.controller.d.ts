import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getAll(): Promise<Product[]>;
    getOne(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    update(updateProductDTO: UpdateProductDto, id: string): Promise<Product>;
}
