import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { TransformInstanceToPlain } from 'class-transformer';
import { sha512 } from 'js-sha512';
import { IdsDto, AccountLoginDto } from '../dto';
import { insLike, insNull } from '../tools';
import { CommonService } from './common';

/**
 * crud 帐号服务
 */
export function AccountService<
  Entity = any,
  CreateDto = any,
  UpdateDto = any,
  QueryDto = any,
  PaginationQueryDto = any,
>(_Entity: Function) {
  class AccountService extends CommonService<Entity, CreateDto, UpdateDto, QueryDto, PaginationQueryDto>(_Entity) {
    /**
     * 给账号固定参数加上模糊查询
     */
    getList(data: QueryDto, options?: FindManyOptions<Entity>) {
      insLike(data, ['username', 'phone', 'nickname']);
      return super.getList(data, options);
    }

    /**
     * 给账号固定参数加上模糊查询
     */
    getListAndCount(data: PaginationQueryDto, options?: FindManyOptions<Entity>) {
      insLike(data, ['username', 'phone', 'nickname']);
      return super.getListAndCount(data, options);
    }

    /**
     * 验证用户名是否存在 并创建用户
     */
    async create(data: CreateDto) {
      const { username } = data as any;
      const one = await this.repository.findOne({ username } as any);
      if (one) throw new BadRequestException('用户名已存在');
      await super.create(data);
    }

    /**
     * 给账号固定参数插入null，避免参数为空时修改失败
     */
    update(id: string, data: UpdateDto) {
      insNull(data, ['phone', 'avatar']);
      return super.update(id, data);
    }

    /**
     * 登录
     */
    @TransformInstanceToPlain()
    async login({ username, password }: AccountLoginDto): Promise<Entity> {
      const one: any = await this.repository.findOne({ username } as any);
      // 账号不存在或密码错误的情况下，提示登录失败
      if (!one || one.password !== sha512(password)) {
        throw new UnauthorizedException('登录失败');
      }
      return one;
    }
  }

  return class extends AccountService {};
}
