import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {TopPage, TopPageDocument} from "./schemas/top-page.schema";
import {CreateTopPageDto, TopLevelCategory} from "./DTO/create-top-page.dto";
import {UpdateTopPageDto} from "./DTO/update-top-page.dto";
import {FindTopPageDto} from "./DTO/find-top-page.dto";

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModel: Model<TopPageDocument>,
  ) {}
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
