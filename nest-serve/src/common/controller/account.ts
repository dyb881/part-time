import { Param, Query, Body, Req } from '@nestjs/common';
import { IAccountService } from '../service';
import { Method } from '../tools';
import { IdsDto, AccountLoginDto } from '../dto';
import { CommonController } from './common';

/**
 * 增刪查改控制器
 */
export function AccountController<
  CreateDto = any, // 创建
  UpdateDto = any, // 更新
  QueryDto = any, // 查询条件
  PaginationQueryDto = any, // 分页查询条件
  Service extends IAccountService = any, // 对应服务
>(
  _Entity: Function, // 返回实体
  _PaginationDto: Function, // 返回分页数据
) {
  class AccountController extends CommonController<CreateDto, UpdateDto, QueryDto, PaginationQueryDto, Service>(
    _Entity,
    _PaginationDto,
  ) {
    @Method('登录', ['Post', 'login'], _Entity)
    login(@Body() data: AccountLoginDto) {
      return this.service.login(data);
    }
  }

  return class extends AccountController {};
}
