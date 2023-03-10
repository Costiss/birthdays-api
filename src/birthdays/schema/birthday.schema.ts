import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export class Birthdate {
  @ApiProperty()
  date: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
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
