import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItem } from './todo-item/entities/todo-item.entity';
import { TodoItemModule } from './todo-item/todo-item.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [TodoItem],
        synchronize: true, // 注意：生产环境不建议使用
      }),
      inject: [ConfigService],
    }),
    TodoItemModule,
    // ... 其他模块
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
