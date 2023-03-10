import { Birthday } from '../schema/birthday.schema';

export class BirthdayDTO {
  constructor(birthday: Birthday) {
    delete birthday['__v'];
    delete birthday['_id'];
    Object.assign(this, { ...birthday });
  }

  static fromBirthday(birthday): BirthdayDTO {
    return new BirthdayDTO(birthday);
  }
}
