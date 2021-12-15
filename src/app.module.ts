import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {ReviewModule} from "./review/review.module";
import {TopPageModule} from "./top-page/top-page.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProductsModule,
        AuthModule,
        ReviewModule,
        TopPageModule,
        MongooseModule.forRoot(
            'mongodb+srv://elizaveta:elizaveta@cluster0.r4c5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        )
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
