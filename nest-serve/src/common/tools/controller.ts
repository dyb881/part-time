import { applyDecorators, Get, Post, Put, Delete, Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

const methods = { Get, Post, Put, Delete };

export type MethodOptions = {
  res?: Function | [Function]; // 接口响应数据类型
  body?: Function | [Function]; // 接口请求体内容类型
  query?: Function | [Function]; // 接口请求参数类型
};

/**
 * 请求方法注册
 */
export const Method = (
  summary: string, // 方法描述
  methodAndPath: string | [string, string], // 请求方法类型与路径
  options?: MethodOptions,
) => {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  // 定义接口文档标题
  decorators.push(ApiOperation({ summary }));

  // 定义请求方法与路径
  if (typeof methodAndPath === 'string') methodAndPath = [methodAndPath, undefined];
  const [method, path] = methodAndPath;
  decorators.push(methods[method](path));

  const { res, body, query } = options || {};
  res && decorators.push(ApiResponse({ type: res }));
  body && decorators.push(ApiBody({ type: body }));
  query && decorators.push(ApiQuery({ type: query }));

  return applyDecorators(...decorators);
};

/**
 * api 接口路径定义
 */
export const ApiPath = (
  prefix: string | string[], // 控制器接口路由
  ...tags: string[] // 控制器描述
) => {
  return applyDecorators(ApiTags(...tags), Controller(prefix));
};
