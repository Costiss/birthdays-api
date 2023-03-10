import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getDate, getMonth, getYear } from 'date-fns';
import { BirthdaysRepository } from './birthdays.repository';
import { BirthdayDTO } from './dto/birthday.dto';
import { CreateBirthdayDTO } from './dto/create-birthday.dto';
import { Birthday } from './schema/birthday.schema';

@Injectable()
export class BirthdaysService {
  constructor(private readonly birthdaysRepository: BirthdaysRepository) {}

  public async saveBirthday(birthdayDto: CreateBirthdayDTO): Promise<BirthdayDTO> {
    const alreadyExists = await this.birthdaysRepository.getByServer(birthdayDto.serverId, birthdayDto.userId);
    if (alreadyExists) throw new HttpException('You already saved a birthday for this server', HttpStatus.BAD_REQUEST);

    const birthdate = new Date(birthdayDto.birthdate);

    const birthday: Birthday = {
      ...Object.assign(this, birthdayDto),
      birthdate: {
        date: getDate(birthdate),
        month: getMonth(birthdate),
        year: getYear(birthdate),
        ISODate: birthdate
      }
    };
    return this.birthdaysRepository.save(birthday).then(BirthdayDTO.fromBirthday);
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
