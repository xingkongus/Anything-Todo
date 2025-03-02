import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @ApiProperty({
    description: '待办事项标题',
    example: '完成作业',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '待办事项是否完成',
    example: false,
    required: false,
    default: false,
  })
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({ description: '所属用户ID' })
  @IsNumber()
  userId: number;
}