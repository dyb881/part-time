import { Param, Query, Body, Req } from '@nestjs/common';
import { ICommonService } from '../service';
import { Method } from '../tools';
import { IdsDto } from '../dto';

/**
 * 增刪查改控制器
 */
export function CommonController<
  Entity extends Function = any, // 实体
  CreateDto extends Function = any, // 创建
  UpdateDto extends Function = any, // 更新
  QueryDto extends Function = any, // 查询条件
  PaginationQueryDto extends Function = any, // 分页查询条件
  PaginationDto extends Function = any, // 分页列表数据
  Service extends ICommonService = any, // 对应服务
>(
  _Entity: Entity,
  _CreateDto: CreateDto,
  _UpdateDto: UpdateDto,
  _QueryDto: QueryDto,
  _PaginationQueryDto: PaginationQueryDto,
  _PaginationDto: PaginationDto,
  _Service: Service,
) {
  class CommonController {
    constructor(readonly service: Service) {}

    @Method('查询所有数据', ['Get', 'all'], { type: [_Entity] })
    getAll(@Query() data: QueryDto) {
      return this.service.getList(data);
    }

    @Method('查询分页列表', 'Get', { type: _PaginationDto })
    getListAndCount(@Query() data: PaginationQueryDto) {
      return this.service.getListAndCount(data);
    }

    @Method('查询详情', ['Get', ':id'], { type: _Entity })
    get(@Param('id') id: string) {
      return this.service.get(id);
    }

    @Method('添加', 'Post')
    async create(@Req() req, @Body() data: CreateDto) {
      Object.assign(data, { reg_ip: req.clientIp });
      await this.service.create(data);
    }

    @Method('编辑', ['Put', ':id'])
    async update(@Param('id') id: string, @Body() data: UpdateDto) {
      await this.service.update(id, data);
    }

    @Method('删除', 'Delete')
    async delete(@Body() { ids }: IdsDto) {
      await this.service.delete(ids);
    }
  }

  return class extends CommonController {};
}
