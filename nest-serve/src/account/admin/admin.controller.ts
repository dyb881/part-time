import { ApiPath, CommonController } from '../../common';
import { AccountAdminService } from './admin.service';
import { AccountAdmin } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from './admin.dto';

@ApiPath('admin', '管理员帐号')
export class AccountAdminController extends CommonController(
  AccountAdmin,
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
  AccountAdminService,
) {
}
