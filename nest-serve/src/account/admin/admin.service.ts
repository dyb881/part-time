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
export class AccountAdminService extends AccountService<
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto
>(AccountAdmin) {
  /**
   * 登录
   */
  async login(data: AccountLoginDto) {
    const one = await super.login(data);
    if (one.status !== 1) throw new UnauthorizedException(`账号${ACCOUNT_ADMIN_STATUS[one.status]}`);
    return one;
  }
}
