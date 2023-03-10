import { ApiProperty } from '@nestjs/swagger';
import { Birthdate, Birthday } from '../schema/birthday.schema';

export class BirthdayDTO {
  @ApiProperty({ example: '315549452688906755', description: 'Discord User ID' })
  userId: string;

  @ApiProperty({ example: '729923565472844437', description: 'Discord Server ID' })
  serverId: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  birthdate: Birthdate;

  constructor(birthday: Birthday) {
    delete birthday['__v'];
    delete birthday['_id'];
    Object.assign(this, { ...birthday });
  }

  static fromBirthday(birthday): BirthdayDTO {
    return new BirthdayDTO(birthday);
  }
}
