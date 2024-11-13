import { LoggerService, ArgumentsHost } from '@nestjs/common';

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
