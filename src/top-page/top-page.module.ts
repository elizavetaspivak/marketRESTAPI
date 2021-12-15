import { Module } from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import {ProductsController} from "../products/products.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "../products/schemas/product.schema";
import {TopPageService} from "./top-page.service";
import {TopPageController} from "./top-page.controller";
import {TopPage, TopPageSchema} from "./schemas/top-page.schema";

@Module({
    providers: [TopPageService],
    controllers: [TopPageController],
    imports: [
        MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
    ],
})
export class TopPageModule {}
