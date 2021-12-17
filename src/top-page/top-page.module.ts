import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
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
