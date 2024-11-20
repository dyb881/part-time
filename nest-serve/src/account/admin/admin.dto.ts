import { PaginationDto, DtoParam, AccountPaginationQueryDto, AccountCreateDto, AccountUpdateDto } from '../../common';
import { ACCOUNT_ADMIN_STATUS, AccountAdmin } from './admin.entity';

/**
 * 分页数据
 */
export class AccountAdminPaginationDto extends PaginationDto(AccountAdmin) {}

/**
 * 查询分页对象
 */
export class AccountAdminPaginationQueryDto extends AccountPaginationQueryDto {
  @DtoParam('角色', { required: false })
  roleId: string;

  @DtoParam('状态', { enum: ACCOUNT_ADMIN_STATUS, isInt: true, required: false })
  status?: number;
}

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
