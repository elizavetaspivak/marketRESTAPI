import {Module} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {TypegooseModule} from "nestjs-typegoose";
import {Product} from "./schemas/product.schema";

@Module({
    providers: [ProductsService],
    controllers: [ProductsController],
    imports: [
        TypegooseModule.forFeature([{
            typegooseClass: Product,
            schemaOptions: {
                collection: 'Products'
            }
        }]),
    ],
})
export class ProductsModule {
}
