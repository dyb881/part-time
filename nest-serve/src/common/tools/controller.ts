import { applyDecorators, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiResponseMetadata } from '@nestjs/swagger';

export type MethodOptions = {
  type?: ApiResponseMetadata['type'];
};

const methods = { Get, Post, Put, Delete };

/**
 * 请求方法注册
 */
export function Method(summary: string, methodAndPath: string | [string, string], options?: MethodOptions) {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  const { type } = options || {};

  // 定义接口文档标题
  decorators.push(ApiOperation({ summary }));

  // 定义请求方法与路径
  if (typeof methodAndPath === 'string') methodAndPath = [methodAndPath, undefined];
  const [method, path] = methodAndPath;
  decorators.push(methods[method](path));

  // 定义返回数据类型
  type && decorators.push(ApiResponse({ type }));

  return applyDecorators(...decorators);
}
