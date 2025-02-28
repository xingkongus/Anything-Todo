import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TodoItem } from './todo-item/entities/todo-item.entity';
import { User } from './users/entities/user.entity';

dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [TodoItem, User],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
