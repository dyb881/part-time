import { Module, DynamicModule } from '@nestjs/common';
import _ from 'lodash';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';

// 日志
import { WinstonModule } from 'nest-winston';
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
          console.log(logsPath);
          
					return {
            exitOnError: false, // 防止意外退出
          };
        },
      }),
    );

    // --------------------------------- 日志模块  end  --------------------------------- //

    return { module: GlobalModule, imports, providers };
  }
}
