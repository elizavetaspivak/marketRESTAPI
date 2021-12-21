import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus, NotFoundException,
    Param, Patch,
    Post,
    Put, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {CreateProductDto} from './DTO/create-product.dto';
import {UpdateProductDto} from './DTO/update-product.dto';
import {ProductsService} from './products.service';
import {Product} from './schemas/product.schema';
import {NOT_FOUND_PRODUCT_ERROR} from "./products.constants";
import {FindProductDto} from "./DTO/find-product.dto";
import {IdValidationPipe} from "../pipes/id-validation.pipe";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {

    }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', IdValidationPipe) id: string): Promise<Product> {
        const product = this.productService.getById(id);
        if (!product) {
            throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
        }
        return product;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('find')
    @Header('Cache-Control', 'none')
    find(@Body() findProductDto: FindProductDto) {
        return this.productService.findWithReview(findProductDto);
    }

    @Delete(':id')
    remove(@Param('id', IdValidationPipe) id: string) {
        const deletedProduct = this.productService.remove(id);
        if (!deletedProduct) {
            throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
        }
    }

    @Patch(':id')
    update(
        @Body() updateProductDTO: UpdateProductDto,
        @Param('id', IdValidationPipe) id: string,
    ): Promise<Product> {
        const updatedProduct = this.productService.update(id, updateProductDTO);
        if (!updatedProduct) {
            throw new NotFoundException(NOT_FOUND_PRODUCT_ERROR);
        }
        return updatedProduct;
    }
}
