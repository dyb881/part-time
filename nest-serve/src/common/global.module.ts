import { Module, DynamicModule } from '@nestjs/common';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';
import yaml from 'js-yaml';

// 日志
import { WinstonModule, WinstonLogger } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

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
    const providers: DynamicModule['providers'] = [];

    const rootPath = path.join(__dirname, '../../'); // 跟目录

    // --------------------------------- 配置模块 start --------------------------------- //

    const configuration = () => {
      const configPath = path.join(rootPath, 'config'); // 配置文件目录
      const envNames = ['development.yaml', 'production.yaml']; // 环境配置
      let configFileNames = fs.readdirSync(configPath); // 获取所有配置文件名
      configFileNames = configFileNames.filter(
        (fileName) => !envNames.includes(fileName),
      ); // 过滤环境配置
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

    imports.push(
      WinstonModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const logsPath = configService.get(`logsPath`); // 获取配置文件路径

          const format = winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.align(),
            winston.format.printf((i) => {
              return `${[i.timestamp]} [${i.level}] ${i.ms} [${i.context}] ${i.message}`;
            }),
          );

          return {
            transports: [
              new DailyRotateFile({
                format,
                filename: `${logsPath}/%DATE%.log`, // 日志文件名
                datePattern: 'YYYY-MM-DD', // 按天生成日志文件
                zippedArchive: true, // 压缩日志文件
                maxSize: '20m', // 日志文件最大20MB
                maxFiles: '14d', // 保留最近 14 天的日志
              }),
              new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.colorize({ all: true }),
                  format,
                ),
              }), // 控制台输出
            ],
            exitOnError: false, // 防止意外退出
          };
        },
      }),
    );

    providers.push(WinstonLogger);

    // --------------------------------- 日志模块  end  --------------------------------- //

    return { module: GlobalModule, imports, providers };
  }
}
