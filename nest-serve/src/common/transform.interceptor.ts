import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, LoggerService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export interface Response<T> {
  code: number;
  data: T;
}

/**
 * 响应参数转化为统一格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    let resNext = next.handle();

    const { url, method, body } = req;

    this.loggerService.log(method, '请求类型');
    this.loggerService.log(url, '请求地址');

    Object.keys(body).length && this.loggerService.log(body, '请求参数');

    // 响应参数转化为统一格式
    resNext = resNext.pipe(map((data) => ({ code: res.statusCode, data })));

    return resNext.pipe(
      tap((res) => {
        this.loggerService.log(res, '响应结果');
      }),
    );
  }
}
