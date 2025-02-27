import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: '用户邮箱',
    example: 'johndoe@example.com',
  })
  email: string;
}