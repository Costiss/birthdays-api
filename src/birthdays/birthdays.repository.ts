import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Birthday, BirthdayDocument } from './schema/birthday.schema';

@Injectable()
export class BirthdaysRepository {
  private readonly SEARCH_DEFAULTS = { __v: false, _id: false };

  constructor(@InjectModel(Birthday.name) private readonly birthdayModel: Model<BirthdayDocument>) {}

  async save(birthday: Birthday): Promise<Birthday> {
    const saved = await this.birthdayModel.create(birthday);
    return saved.toObject();
  }

  async getByServer(serverId: string, userId: string): Promise<Birthday | undefined> {
    return this.birthdayModel.findOne({ serverId, userId }, this.SEARCH_DEFAULTS);
  }

  async getAllByServer(serverId: string): Promise<Birthday[]> {
    return this.birthdayModel.find({ serverId }, this.SEARCH_DEFAULTS);
  }

  async delete(serverId: string, userId: string): Promise<void> {
    await this.birthdayModel.deleteOne({ serverId, userId });
  }
}
