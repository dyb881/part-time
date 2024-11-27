import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import {
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
} from './admin.dto';
import { AccountAdmin } from './admin.entity';
import { TransformInstanceToPlain } from 'class-transformer';
import { IdsDto, toWhere } from '../../common';

@Injectable()
export class AccountAdminService {
  constructor(@InjectRepository(AccountAdmin) private readonly repository: Repository<AccountAdmin>) {}

  /**
   * 查询所有数据
   */
  @TransformInstanceToPlain()
  async getList(data: AccountAdminQueryDto, options?: FindManyOptions<AccountAdmin>) {
    const list = await this.repository.find({
      where: toWhere(data),
      order: { create_date: 'DESC' },
      ...options,
    });
    return list;
  }

  /**
   * 查询数据数据与总数
   */
  @TransformInstanceToPlain()
  async getListAndCount(
    { current, pageSize, ...data }: AccountAdminPaginationQueryDto,
    options?: FindManyOptions<AccountAdmin>,
  ) {
    const [list, total] = await this.repository.findAndCount({
      where: toWhere(data),
      order: { create_date: 'DESC' },
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
    const one = await this.repository.findOneBy({ id });
    if (!one) throw new BadRequestException('该数据不存在');
    return one;
  }

  /**
   * 创建数据
   */
  async create(data: AccountAdminCreateDto) {
    await this.repository.save(data);
  }

  /**
   * 更新数据
   */
  async update(id: string, data: AccountAdminUpdateDto) {
    await this.repository.update(id, data);
  }

  /**
   * 删除数据
   */
  async delete(ids: IdsDto['ids']) {
    if (!ids.length) throw new BadRequestException('ids 不可为空');
    await this.repository.delete(ids);
  }
}
