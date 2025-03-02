import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UsersService } from '../users/users.service';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { BusinessException } from 'src/common/exceptions';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
    private usersService: UsersService,
  ) { }

  async create(createTodoItemDto: CreateTodoItemDto, userId: number) {
    console.log('BusinessException 1')
    const user = await this.usersService.findOne(userId);
    console.log('BusinessException 12')
    if (!user) {
      // throw new NotFoundException('User not found');
      console.log('BusinessException 11')
      throw new BusinessException.throwResourceNotFound('User not found')
    }

    const todoItem = this.todoItemRepository.create({
      ...createTodoItemDto,
      user,
    });

    return this.todoItemRepository.save(todoItem);
  }
  

  findAll() {
    return this.todoItemRepository.find({
      relations: ['user'],
    });
  }

  findByUser(userId: number) {
    return this.todoItemRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
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