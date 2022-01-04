import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {TopPage} from "./schemas/top-page.schema";
import {CreateTopPageDto} from "./DTO/create-top-page.dto";
import {UpdateTopPageDto} from "./DTO/update-top-page.dto";
import {FindTopPageDto} from "./DTO/find-top-page.dto";
import {ModelType} from "@typegoose/typegoose/lib/types";

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel('TopPage') private topPageModel: ModelType<TopPage>) {}
  private topPage = [];

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

  async findByCategory(findTopPageDto: FindTopPageDto): Promise<Array<TopPage>> {
    return this.topPageModel.find({findTopPageDto}, {alias: 1, secondCategory: 1, title: 1}).exec();
  }

  async delete(id: string): Promise<TopPage> {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }
}
