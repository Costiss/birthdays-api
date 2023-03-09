import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Birthday, BirthdayDocument } from './schema/birthday.schema';

@Injectable()
export class BirthdaysRepository {
  constructor(@InjectModel(Birthday.name) private readonly birthdayModel: Model<BirthdayDocument>) {}

  async save(birthday: Birthday): Promise<Birthday> {
    return this.birthdayModel.create(birthday);
  }

  async getByServer(serverId: string, userId: string): Promise<Birthday | undefined> {
    return this.birthdayModel.findOne({ serverId, userId });
  }

  async getAllByServer(serverId: string): Promise<Birthday[]> {
    return this.birthdayModel.find({ serverId });
  }

  async delete(serverId: string, userId: string): Promise<void> {
    this.birthdayModel.deleteOne({ serverId, userId });
  }
}
