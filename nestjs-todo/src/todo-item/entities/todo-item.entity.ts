import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('todo_item')
export class TodoItem {
  @ApiProperty({ description: '待办事项ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '待办事项标题' })
  @Column()
  title: string;

  @ApiProperty({ description: '待办事项描述' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: '是否完成' })
  @Column({ default: false })
  isCompleted: boolean;

  @ApiProperty({ description: '所属用户' })
  @ManyToOne(() => User, user => user.todoItems)
  user: User;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}