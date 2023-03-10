import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Birthdate {
  date: number;

  month: number;

  year: number;

  ISODate: Date;
}

@Schema()
export class Birthday {
  @Prop({ index: true, id: true })
  userId: string;

  @Prop({ index: true })
  serverId: string;

  @Prop({ required: false })
  username?: string;

  @Prop()
  birthdate: Birthdate;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);
BirthdaySchema.index({ serverId: 1, userId: 1 }, { unique: true });

export type BirthdayDocument = HydratedDocument<Birthday>;
