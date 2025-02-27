import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: '用户ID',
    example: 1
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '用户名',
    example: 'johndoe',
    maxLength: 100
  })
  @Column({ length: 100, unique: true })
  username: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456'
  })
  @Column()
  password: string;

  @ApiProperty({
    description: '用户邮箱',
    example: 'johndoe@example.com',
    maxLength: 100
  })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-01T00:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-01T00:00:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '用户的待办事项列表' })
  @OneToMany(() => TodoItem, todoItem => todoItem.user)
  todoItems: TodoItem[];
}