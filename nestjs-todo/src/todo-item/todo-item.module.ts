import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemController } from './todo-item.controller';
import { TodoItemService } from './todo-item.service';
import { TodoItem } from './entities/todo-item.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem, User])],
  controllers: [TodoItemController],
  providers: [TodoItemService, UsersService]
})
export class TodoItemModule {}
