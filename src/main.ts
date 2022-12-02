import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('Market Api')
        .setVersion('1.0')
        .addTag('market')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 8080, () => {
        return 'Server started'
    });
}

bootstrap();
