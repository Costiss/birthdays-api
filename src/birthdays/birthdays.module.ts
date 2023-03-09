import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirthdaysController } from './birthdays.controller';
import { BirthdaysRepository } from './birthdays.repository';
import { BirthdaysService } from './birthdays.service';
import { Birthday, BirthdaySchema } from './schema/birthday.schema';

@Module({
  providers: [BirthdaysRepository, BirthdaysService],
  controllers: [BirthdaysController],
  imports: [MongooseModule.forFeature([{ name: Birthday.name, schema: BirthdaySchema }])]
})
export class BirthdaysModule {}
