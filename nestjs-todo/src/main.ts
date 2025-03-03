import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BusinessExceptionFilter } from './common/filters/business-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new BusinessExceptionFilter());
  
  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Todo 应用的 API 文档')
    .setVersion('1.0')
    .addTag('todo-items')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
