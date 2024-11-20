import { Entity } from 'typeorm';
import { AccountEntity, EntityColumn } from '../../common';

/**
 * 状态
 */
export const ACCOUNT_ADMIN_STATUS = ['未审核', '已审核', '已冻结'];

/**
 * 数据实体
 */
@Entity()
export class AccountAdmin extends AccountEntity {
  @EntityColumn('角色', 36)
  roleId: string;

  @EntityColumn('状态', { enum: ACCOUNT_ADMIN_STATUS })
  status: number;
}
