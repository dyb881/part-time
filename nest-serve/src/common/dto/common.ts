import { DtoParam } from '../tools';

/**
 * 查询分页对象
 */
export class PaginationQueryDto {
  @DtoParam('当前页码', { isInt: true, default: 1 })
  current: number;

  @DtoParam('每页数量', { isInt: true, default: 10 })
  pageSize: number;
}

/**
 * 分页对象
 */
export function PaginationDto<Dto extends Function>(_Dto: Dto) {
  class PaginationDto {
    @DtoParam('列表', { type: [_Dto] })
    list: Dto[];

    @DtoParam('总数')
    total: number;
  }
  return class extends PaginationDto {};
}

/**
 * ID 数组
 */
export class IdsDto {
  @DtoParam('ID数组')
  ids: string[];
}
