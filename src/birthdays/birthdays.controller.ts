import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BirthdaysService } from './birthdays.service';
import { BirthdayDTO } from './dto/birthday.dto';
import { CreateBirthdayDTO } from './dto/create-birthday.dto';
import { Birthday } from './schema/birthday.schema';

@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdaysService: BirthdaysService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateBirthdayDTO })
  @ApiCreatedResponse({ type: Birthday })
  async saveBirthday(@Body() body: CreateBirthdayDTO): Promise<BirthdayDTO> {
    return this.birthdaysService.saveBirthday(body);
  }

  @Get(':serverId/:userId')
  @ApiOkResponse({ type: Birthday })
  async getByServer(@Param('serverId') serverId: string, @Param('userId') userId: string): Promise<Birthday> {
    return this.birthdaysService.getByServer(serverId, userId);
  }

  @Get(':serverId')
  @ApiOkResponse({ type: Birthday, isArray: true })
  async getByUser(@Param('serverId') serverId: number): Promise<Birthday[]> {
    return this.birthdaysService.getAllByServer(serverId.toString());
  }

  @Delete(':serverId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('serverId') serverId: string, @Param('userId') userId: string): Promise<void> {
    this.birthdaysService.deleteUser(serverId, userId);
  }
}
