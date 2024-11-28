import { ApiPath, AccountController } from '../../common';
import { AccountAdminService } from './admin.service';
import { AccountAdmin } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from './admin.dto';

@ApiPath('admin', '帐号管理', '管理员帐号')
export class AccountAdminController extends AccountController<
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminService
>(AccountAdmin, AccountAdminPaginationDto) {}
