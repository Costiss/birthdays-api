import { Birthday } from '../schema/birthday.schema';

export class BirthdayDTO {
  constructor(birthday: Birthday) {
    Object.assign(this, birthday);
  }
}
