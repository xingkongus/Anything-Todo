import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';

@ApiTags('todo-items')
@Controller('todo-item')
export class TodoItemController {
    constructor(private readonly todoItemService: TodoItemService) { }

    @Post()
    @ApiOperation({ summary: '创建待办事项', description: '创建一个新的待办事项' })
    @ApiBody({ type: CreateTodoItemDto, description: '待办事项创建参数' })
    @ApiResponse({ status: HttpStatus.CREATED, description: '待办事项创建成功', type: TodoItem })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '无效的请求参数' })
    create(@Body() createTodoItemDto: CreateTodoItemDto) {
        console.log('createTodoItemDto', createTodoItemDto)
        return this.todoItemService.create(createTodoItemDto, createTodoItemDto.userId);
    }

    @Get()
    @ApiOperation({ summary: '获取所有待办事项', description: '获取系统中的所有待办事项列表' })
    @ApiResponse({ status: HttpStatus.OK, description: '成功获取待办事项列表', type: [TodoItem] })
    findAll() {
        return this.todoItemService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '获取指定待办事项', description: '根据ID获取特定的待办事项' })
    @ApiParam({ name: 'id', description: '待办事项ID', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, description: '成功获取待办事项', type: TodoItem })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '待办事项未找到' })
    findOne(@Param('id') id: string) {
        return this.todoItemService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: '更新待办事项', description: '根据ID更新特定的待办事项' })
    @ApiParam({ name: 'id', description: '待办事项ID', type: 'number' })
    @ApiBody({ type: UpdateTodoItemDto, description: '待办事项更新参数' })
    @ApiResponse({ status: HttpStatus.OK, description: '待办事项更新成功', type: TodoItem })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '待办事项未找到' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '无效的请求参数' })
    update(@Param('id') id: string, @Body() updateTodoItemDto: UpdateTodoItemDto) {
        return this.todoItemService.update(+id, updateTodoItemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除待办事项', description: '根据ID删除特定的待办事项' })
    @ApiParam({ name: 'id', description: '待办事项ID', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, description: '待办事项删除成功' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '待办事项未找到' })
    remove(@Param('id') id: string) {
        return this.todoItemService.remove(+id);
    }
}
