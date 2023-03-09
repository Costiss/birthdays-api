import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getDate, getMonth, getYear } from 'date-fns';
import { BirthdaysRepository } from './birthdays.repository';
import { CreateBirthdayDTO } from './dto/create-birthday.dto';
import { Birthday } from './schema/birthday.schema';

@Injectable()
export class BirthdaysService {
  constructor(private readonly birthdaysRepository: BirthdaysRepository) {}

  public async saveBirthday(birthdayDto: CreateBirthdayDTO): Promise<Birthday> {
    const alreadyExists = this.birthdaysRepository.getByServer(birthdayDto.serverId, birthdayDto.userId);
    if (alreadyExists) throw new HttpException('You already saved a birthday for this server', HttpStatus.BAD_REQUEST);
    const birthday: Birthday = {
      ...Object.assign(this, birthdayDto),
      birthdate: {
        date: getDate(birthdayDto.birthdate),
        month: getMonth(birthdayDto.birthdate),
        year: getYear(birthdayDto.birthdate),
        ISODate: birthdayDto.birthdate
      }
    };
    return this.birthdaysRepository.save(birthday);
  }

  public async getByServer(serverId: string, userId: string): Promise<Birthday> {
    const birthday = await this.birthdaysRepository.getByServer(serverId, userId);
    if (!birthday) throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);

    return birthday;
  }

  public async getAllByServer(serverId: string): Promise<Birthday[]> {
    return this.birthdaysRepository.getAllByServer(serverId);
  }

  public async deleteUser(serverId: string, userId: string): Promise<void> {
    this.birthdaysRepository.delete(serverId, userId);
  }
}
