import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../app.module";
import * as request from 'supertest'
import {CreateReviewDto} from "../review/DTO/create-review.dto";
import { disconnect } from 'mongoose';

const testDTO: CreateReviewDto = {
    name: 'Тест',
    title: 'GGG',
    description: 'jbdsjfbd',
    rating: 5,
    productId: '222'
}

describe('AppController (e2e)', () => {
    let appController: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        appController = app.createNestApplication()
        await appController.init()
    });

    it('/review (POST)', async (done) => {
        return request(appController.getHttpServer()).post('/review').send(testDTO).expect(201).then(({body}: request.Response) => {
            createdId = body._id;
            expect(createdId).not.toBe(null)
            expect(createdId).toBeDefined()
        })
    });

    afterAll(() => {
        disconnect()
    })
});