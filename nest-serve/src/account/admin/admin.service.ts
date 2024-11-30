import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService, AccountLoginDto } from '../../common';
import { AccountAdmin, ACCOUNT_ADMIN_STATUS } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
} from './admin.dto';

@Injectable()
export class AccountAdminService extends AccountService(
  AccountAdmin,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
) {
  /**
   * 登录
   */
  login(data: AccountLoginDto) {
    return super.login(data, (one: AccountAdmin) => {
      // 验证帐号状态
      if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    });
  }
}
