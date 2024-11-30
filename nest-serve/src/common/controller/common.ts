import { Param, Query, Body, Inject } from '@nestjs/common';
import { Method } from '../tools';
import { IdsDto } from '../dto';
import { TClass } from '../service';

/**
 * 增刪查改控制器
 */
export function CommonController<
  Service extends { [key: string]: any }, // 对应服务
  Entity, // 实体
  CreateDto, // 创建
  UpdateDto, // 更新
  QueryDto, // 查询条件
  PaginationQueryDto, // 分页查询条件
  PaginationDto, // 返回分页数据
>(
  _Entity: TClass<Entity>,
  _CreateDto: TClass<CreateDto>,
  _UpdateDto: TClass<UpdateDto>,
  _QueryDto: TClass<QueryDto>,
  _PaginationQueryDto: TClass<PaginationQueryDto>,
  _PaginationDto: TClass<PaginationDto>,
  _Service: TClass<Service>,
) {
  class CommonController {
    constructor(@Inject(_Service) readonly service: Service) {}

    @Method('查询所有数据', ['Get', 'all'], { res: [_Entity], query: _QueryDto })
    getList(@Query() data: QueryDto) {
      return this.service.getList(data);
    }

    @Method('查询分页列表', 'Get', { res: _PaginationDto, query: _PaginationQueryDto })
    getListAndCount(@Query() data: PaginationQueryDto) {
      return this.service.getListAndCount(data);
    }

    @Method('查询详情', ['Get', ':id'], { res: _Entity })
    get(@Param('id') id: string) {
      return this.service.get(id);
    }

    @Method('添加', 'Post', { body: _CreateDto })
    async create(@Body() data: CreateDto) {
      await this.service.create(data);
    }

    @Method('编辑', ['Put', ':id'], { body: _UpdateDto })
    async update(@Param('id') id: string, @Body() data: UpdateDto) {
      await this.service.update(id, data);
    }

    @Method('删除', 'Delete', { body: IdsDto })
    async delete(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CommonController {};
}
