import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, DynamicModule, ValidationPipe } from '@nestjs/common';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';
import yaml from 'js-yaml';

// 日志
import { WinstonModule } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

// 全局处理器
import { AllExceptionFilter } from './all.exception.filter'; // 异常过滤器
import { TransformInterceptor } from './transform.interceptor'; // 响应参数转化为统一格式

/**
 * 全局模块
 */
@Module({})
export class GlobalModule {
  /**
   * 全局模块初始化
   */
  static forRoot(): DynamicModule {
    const imports: DynamicModule['imports'] = [];

    const rootPath = path.join(__dirname, '../../'); // 跟目录

    // --------------------------------- 配置模块 start --------------------------------- //

    const configuration = () => {
      const configPath = path.join(rootPath, 'config'); // 配置文件目录
      const envNames = ['development.yaml', 'production.yaml']; // 环境配置
      let configFileNames = fs.readdirSync(configPath); // 获取所有配置文件名
      configFileNames = configFileNames.filter((fileName) => !envNames.includes(fileName)); // 过滤环境配置
      configFileNames.push(`${process.env.NODE_ENV || 'development'}.yaml`); // 插入当前环境配置

      // 合并配置
      let config: any = {};

      configFileNames.forEach((fileName) => {
        try {
          const filePath = path.join(configPath, fileName); // 配置文件路径
          const exists = fs.existsSync(filePath); // 文件存在
          if (exists) {
            const currentConfigText = fs.readFileSync(filePath, 'utf8'); // 配置文本
            const currentConfig = yaml.load(currentConfigText); // 配置对象
            config = _.merge(config, currentConfig); // 深合并配置
          }
        } catch {}
      });

      // 递归处理配置值
      config = _.cloneDeepWith(config, (value) => {
        if (value === null) return ''; // null 转为 空字符串
      });

      return config;
    };

    imports.push(
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [configuration],
      }),
    );

    // --------------------------------- 配置模块  end  --------------------------------- //

    // --------------------------------- 日志模块 start --------------------------------- //

    // 终端加上颜色
    const lc = (code: number | string, text: any) => `\x1B[${code}m${text}\x1B[0m`;

    // 定义日志级别颜色
    const levelsColors = {
      error: 31,
      warn: 33,
      info: 32,
      debug: 34,
      verbose: 36,
    };

    imports.push(
      WinstonModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const logsPath = configService.get(`logsPath`); // 获取配置文件路径

          const format = winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          );

          return {
            transports: [
              new DailyRotateFile({
                format: winston.format.combine(
                  format,
                  winston.format.printf((i) => {
                    const { code, error, message, data } = i;
                    let log = [
                      i.timestamp, // 添加时间
                      `[${i.level}]`, // 添加等级
                      i.ms, // 添加毫秒
                      `[${i.context || i.stack[0]}]`, // 内容类型
                    ].join(' ');

                    // 处理打印
                    if (error instanceof Error) {
                      log += '\n' + error.stack;
                    } else if (code && error && message) {
                      log += '\n' + JSON.stringify({ code, error, message }, null, 2);
                    } else if (code && data) {
                      log += '\n' + JSON.stringify({ code, data }, null, 2);
                    } else log += '\t' + i.message;

                    return log;
                  }),
                ),
                filename: `${logsPath}/%DATE%.log`, // 日志文件名
                datePattern: 'YYYY-MM-DD', // 按天生成日志文件
                zippedArchive: true, // 压缩日志文件
                maxSize: '20m', // 日志文件最大20MB
                maxFiles: '14d', // 保留最近 14 天的日志
              }),
              new winston.transports.Console({
                format: winston.format.combine(
                  format,
                  winston.format.printf((i) => {
                    const { code, error, message, data } = i;
                    let log = [
                      lc(30, i.timestamp), // 添加时间
                      lc(levelsColors[i.level], `[${i.level}]`), // 添加等级
                      lc(37, i.ms), // 添加毫秒
                      lc(35, `[${i.context || i.stack[0]}]`), // 内容类型
                    ].join(' ');

                    // 处理打印
                    if (error instanceof Error) {
                      log += '\n' + error.stack;
                    } else if (code && error && message) {
                      log += '\n' + JSON.stringify({ code, error, message }, null, 2);
                    } else if (code && data) {
                      log += '\n' + JSON.stringify({ code, data }, null, 2);
                    } else log += '\t' + lc(32, i.message);

                    return log;
                  }),
                ),
              }), // 控制台输出
            ],
            exitOnError: false, // 防止意外退出
          };
        },
      }),
    );

    // --------------------------------- 日志模块  end  --------------------------------- //

    return {
      module: GlobalModule,
      imports,
      providers: [
        // 全局使用验证管道，并统一报错处理
        { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
        // 异常过滤器
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        // 响应参数转化拦截器
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      ],
    };
  }
}
