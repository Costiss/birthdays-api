import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirthdaysModule } from './birthdays/birthdays.module';
import { getEnv } from './utils/get-env';

const DATABASE_URL = getEnv('DATABASE_URL');

@Module({
  imports: [BirthdaysModule, MongooseModule.forRoot(DATABASE_URL)]
})
export class AppModule {}
