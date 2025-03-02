import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItem } from './todo-item/entities/todo-item.entity';
import { TodoItemModule } from './todo-item/todo-item.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { BusinessExceptionFilter } from './common/filters/business-exception.filter';
import { BadRequestExceptionFilter } from './common/filters/badrequest-exception.filter';

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
        entities: [TodoItem, User],
        synchronize: false, // 注意：生产环境不建议使用
        migrations: [__dirname + '/migrations/*.ts'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    TodoItemModule,
    UsersModule,
    // ... 其他模块
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BusinessExceptionFilter,
    }
  ],
  controllers: [AppController],
})
export class AppModule {}
