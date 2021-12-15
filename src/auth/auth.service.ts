import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Auth, AuthDocument} from "../../dist/auth/schemas/auth.schema";
import {CreateAuthDto} from "../../dist/auth/DTO/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}
  private auth = {};

  async login(authDto: CreateAuthDto): Promise<Auth> {
    return this.authModel.create(authDto);
  }

  async register(authDto: CreateAuthDto): Promise<Auth> {
    return this.authModel.create(authDto);
  }

  async logout(id: string): Promise<Auth> {
    return this.authModel.findByIdAndRemove(id);
  }
}
