import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Birthdate {
  @Prop()
  date: number;

  @Prop()
  month: number;

  @Prop()
  year: number;

  @Prop()
  ISODate: Date;
}

@Schema()
export class Birthday {
  @Prop({ required: false })
  username?: string;

  @Prop()
  birthdate: Birthdate;

  @Prop()
  serverId: string;

  @Prop()
  userId: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);
BirthdaySchema.index({ serverId: 1, userId: 1 }, { unique: true });

export type BirthdayDocument = HydratedDocument<Birthday>;
