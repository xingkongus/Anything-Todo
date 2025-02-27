import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { CreateTodoItemDto } from './create-todo-item.dto';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    readonly title?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    readonly description?: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean;
}
