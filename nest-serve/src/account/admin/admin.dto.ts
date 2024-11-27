import {
  PaginationQueryDto,
  PaginationDto,
  DtoParam,
  AccountQueryDto,
  AccountCreateDto,
  AccountUpdateDto,
} from '../../common';
import { ACCOUNT_ADMIN_STATUS, AccountAdmin } from './admin.entity';

/**
 * 查询条件
 */
export class AccountAdminQueryDto extends AccountQueryDto {
  @DtoParam('角色', { required: false })
  roleId?: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true, required: false })
  status?: number;
}

/**
 * 查询分页数据条件
 */
export class AccountAdminPaginationQueryDto extends PaginationQueryDto(AccountAdminQueryDto) {}

/**
 * 分页数据
 */
export class AccountAdminPaginationDto extends PaginationDto(AccountAdmin) {}

/**
 * 创建数据对象
 */
export class AccountAdminCreateDto extends AccountCreateDto {
  @DtoParam('角色')
  roleId: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true })
  status: number;
}

/**
 * 编辑数据对象
 */
export class AccountAdminUpdateDto extends AccountUpdateDto {
  @DtoParam('角色')
  roleId: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true })
  status: number;
}
