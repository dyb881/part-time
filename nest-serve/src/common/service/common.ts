import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { TransformInstanceToPlain } from 'class-transformer';
import { toWhere } from '../tools';
import { IdsDto } from '../dto';

/**
 * curd 公共服务类型
 */
export interface ICommonService {
  [key: string]: any
}

/**
 * crud 公共服务
 */
export function CommonService<
  Entity = any, // 实体
  CreateDto = any, // 创建
  UpdateDto = any, // 更新
  QueryDto = any, // 查询条件
  PaginationQueryDto = any, // 分页查询条件
>(_Entity: Function) {
  class CommonService implements ICommonService {
    constructor(@InjectRepository(_Entity) readonly repository: Repository<Entity>) {}

    /**
     * 查询所有数据
     */
    @TransformInstanceToPlain()
    async getList(data: QueryDto, options?: FindManyOptions<Entity>) {
      const list = await this.repository.find({
        where: toWhere(data),
        order: { create_date: 'DESC' } as any,
        ...options,
      });
      return list;
    }

    /**
     * 查询数据数据与总数
     */
    @TransformInstanceToPlain()
    async getListAndCount(_data: PaginationQueryDto, options?: FindManyOptions<Entity>) {
      const { current, pageSize, ...data } = _data as any;
      const [list, total] = await this.repository.findAndCount({
        where: toWhere(data),
        order: { create_date: 'DESC' } as any,
        skip: (current - 1) * pageSize,
        take: pageSize,
        ...options,
      });
      return { list, total };
    }

    /**
     * 查询一条数据
     */
    @TransformInstanceToPlain()
    async get(id: string) {
      const one = await this.repository.findOneBy({ id } as any);
      if (!one) throw new BadRequestException('该数据不存在');
      return one;
    }

    /**
     * 创建数据
     */
    async create(data: CreateDto) {
      await this.repository.save(data as any);
    }

    /**
     * 更新数据
     */
    async update(id: string, data: UpdateDto) {
      await this.repository.update(id, data as any);
    }

    /**
     * 删除数据
     */
    async delete(ids: IdsDto['ids']) {
      if (!ids.length) throw new BadRequestException('ids 不可为空');
      await this.repository.delete(ids);
    }
  }

  return class extends CommonService {};
}
