import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { mw } from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // 获取客户端真实IP
  app.use(mw());

  // 获取配置服务
  const configService = app.get<ConfigService>(ConfigService);

  // 插入日志
  const loggerService = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);

  const swagger = configService.get('swagger');

  // 服务配置
  const serve = configService.get('serve');
  app.setGlobalPrefix(serve.prefix); // 接口请求前缀
  await app.listen(process.env.PORT ?? serve.port); // 启动服务

  // 捕获进程错误
  process.on('uncaughtException', function (err) {
    loggerService.error(err, '进程异常');
  });

  // 输出链接
  const swaggerUrl = `http://localhost:${serve.port}/${swagger.path}`; // 接口文档
  loggerService.log(swaggerUrl, swagger.title);
}

bootstrap();
