import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @ApiProperty({
    description: '待办事项标题',
    example: '完成作业',
  })
  title: string;

  @ApiProperty({
    description: '待办事项是否完成',
    example: false,
    required: false,
    default: false,
  })
  completed?: boolean;
}