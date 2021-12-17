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

  async create(topPageDto: CreateTopPageDto): Promise<TopPage> {
    return this.topPageModel.create(topPageDto);
  }

  async update(id: string, updateTopPageDto: UpdateTopPageDto): Promise<TopPage> {
    return this.topPageModel.findByIdAndUpdate(id, updateTopPageDto, {new: true});
  }

  async find(findTopPageDto: FindTopPageDto): Promise<Array<TopPage>> {
    return this.topPageModel.find(findTopPageDto).exec();
  }

  async delete(id: string): Promise<TopPage> {
    return this.topPageModel.findByIdAndRemove(id);
  }
}
