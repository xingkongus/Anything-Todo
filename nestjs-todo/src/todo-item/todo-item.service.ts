import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
  ) {}

  // 使用 repository 方法进行数据库操作
  create(createTodoItemDto: CreateTodoItemDto) {
    const todoItem = this.todoItemRepository.create(createTodoItemDto);
    return this.todoItemRepository.save(todoItem);
  }

  findAll() {
    return this.todoItemRepository.find();
  }

  findOne(id: number) {
    return this.todoItemRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    await this.todoItemRepository.update(id, updateTodoItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const todoItem = await this.findOne(id);
    if (!todoItem) {
      throw new Error('Todo item not found');
    }
    return this.todoItemRepository.remove(todoItem);
  }
}