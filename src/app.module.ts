import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {AuthModule} from './auth/auth.module';
import {ReviewModule} from "./review/review.module";
import {TopPageModule} from "./top-page/top-page.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypegooseModule} from "nestjs-typegoose";
import {getMongoConfig} from "./configs/mongo.config";
import {FilesModule} from "./files/files.module";
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import {getTelegramConfig} from "./configs/telegram.configs";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProductsModule,
        AuthModule,
        ReviewModule,
        TopPageModule,
        FilesModule,
        TypegooseModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: getMongoConfig
            }
        ),
        SitemapModule,
        TelegramModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTelegramConfig
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
