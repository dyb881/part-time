import { applyDecorators, Get, Post, Put, Delete, Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiResponseMetadata, ApiTags } from '@nestjs/swagger';

const methods = { Get, Post, Put, Delete };

/**
 * 请求方法注册
 */
export function Method(
  summary: string, // 方法描述
  methodAndPath: string | [string, string], // 请求方法类型与路径
  type?: ApiResponseMetadata['type'], // 接口响应数据类型
) {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

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

/**
 * api 接口路径定义
 */
export function ApiPath(
  prefix: string | string[], // 控制器接口路由
  ...tags: string[] // 控制器描述
) {
  return applyDecorators(ApiTags(...tags), Controller(prefix));
}
