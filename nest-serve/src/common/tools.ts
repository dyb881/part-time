import { LoggerService } from '@nestjs/common';
import {
  ApiProperty as ApiPropertySource,
  ApiOperation as ApiOperationSource,
  ApiPropertyOptions,
  ApiOperationOptions,
} from '@nestjs/swagger';
import path from 'path';

/**
 * 跟目录
 */
export const rootPath = path.join(__dirname, '../../'); 

/**
 * 客户端 ip 字符串 转化纯 ip
 */
export const toIp = (ip: string) => ip?.replace?.('::ffff:', '').replace('::1', '127.0.0.1');

let num = 0;
const line = '▬'.repeat(50);

/**
 * 请求日志
 */
export const requestLogger = (logget: LoggerService, request: any, content: Function) => {
  num += 1;
  logget.log(`\nstart ${line} ${num} ${line} start`, '请求开始');
  const { url, clientIp, method, body } = request;
  logget.log(`${toIp(clientIp)} ${method} ${url}`, '请求路径');
  Object.keys(body).length && logget.log(body, '请求参数');
  content();
  logget.log(`\n-end- ${line} ${num} ${line} -end-`, '请求结束');
};

/**
 * 获取对象真实 key 数组
 */
export const getKeys = (object: object) => {
  // 获取 key 列表
  let keys: (string | number)[] = Object.keys(object);
  // 数组对象的 key 转化为数字
  if (Array.isArray(object)) keys = keys.map((i) => +i);
  return keys;
};

/**
 * 获取枚举备注文本
 */
export const getEnumRemark = (object: object) => {
  return Object.keys(object)
    .map((i) => `${i}:${object[i]}`)
    .join('、');
};

/**
 * swagger 标注
 */
export const ApiProperty = (description: string, options?: ApiPropertyOptions) => {
  return ApiPropertySource({ description, ...options });
};

/**
 * swagger 枚举标注
 */
export const ApiPropertyEnum = (description: string, object: object, options?: ApiPropertyOptions) => {
  return ApiPropertySource({
    enum: getKeys(object),
    description: `${description}，${getEnumRemark(object)}`,
    ...options,
  });
};

/**
 * swagger 数组标注
 */
export const ApiPropertyArray = (description: string, object: object, options?: ApiPropertyOptions) => {
  return ApiPropertySource({
    description: `${description}，${getEnumRemark(object)}`,
    type: [String],
    ...options,
  });
};

/**
 * swagger 路由标注
 */
export const ApiOperation = (summary: string, options?: ApiOperationOptions) => {
  return ApiOperationSource({ summary, ...options });
};
