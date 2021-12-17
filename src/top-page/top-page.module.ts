import { Module } from '@nestjs/common';
import {TopPageService} from "./top-page.service";
import {TopPageController} from "./top-page.controller";
import {TopPage} from "./schemas/top-page.schema";
import {TypegooseModule} from "nestjs-typegoose";

@Module({
    providers: [TopPageService],
    controllers: [TopPageController],
    imports: [
        TypegooseModule.forFeature([{
            typegooseClass: TopPage,
            schemaOptions: {
                collection: 'TopPage'
            }
        }]),
    ]
})
export class TopPageModule {}
