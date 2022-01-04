import {Injectable} from '@nestjs/common';
import {TopPage} from "./schemas/top-page.schema";
import {CreateTopPageDto, TopLevelCategory} from "./DTO/create-top-page.dto";
import {UpdateTopPageDto} from "./DTO/update-top-page.dto";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";

@Injectable()
export class TopPageService {
    constructor(
        @InjectModel(TopPage) private topPageModel: ModelType<TopPage>) {
    }

    async getById(id: string): Promise<TopPage> {
        return this.topPageModel.findById(id).exec();
    }

    async findByAlias(alias: string): Promise<TopPage> {
        return this.topPageModel.findOne({alias}).exec();
    }

    async create(topPageDto: CreateTopPageDto): Promise<TopPage> {
        return this.topPageModel.create(topPageDto);
    }

    async update(id: string, updateTopPageDto: UpdateTopPageDto): Promise<TopPage> {
        return this.topPageModel.findByIdAndUpdate(id, updateTopPageDto, {new: true}).exec();
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return await this.topPageModel.aggregate().match({firstCategory}).group({
            _id: {secondCategory: '$secondCategory'},
            pages: {$push: {alias: '$alias', title: '$title'}}
            }).exec();
    }

    async delete(id: string): Promise<TopPage> {
        return this.topPageModel.findByIdAndRemove(id).exec();
    }

    async findByText(text: string) {
        return this.topPageModel.find({$text: {$search: text, $caseSensitive: false}}).exec();
    }
}
