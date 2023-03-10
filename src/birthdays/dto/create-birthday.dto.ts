import { ApiProperty } from '@nestjs/swagger';

export class CreateBirthdayDTO {
  @ApiProperty({ example: '315549452688906755', description: 'Discord User ID' })
  userId: string;

  @ApiProperty({ example: '729923565472844437', description: 'Discord Server ID' })
  serverId: string;

  @ApiProperty({ example: '1998-07-01', description: 'Date of Birthday' })
  birthdate: string;

  @ApiProperty()
  username?: string;
}
