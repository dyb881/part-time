import { ApiPathAuth, CommonController } from '../../common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import {
  AdminCreateDto,
  AdminUpdateDto,
  AdminQueryDto,
  AdminPaginationQueryDto,
  AdminPaginationDto,
} from './admin.dto';

@ApiPathAuth('admin', '管理员帐号')
export class AdminController extends CommonController(
  Admin,
  AdminCreateDto,
  AdminUpdateDto,
  AdminQueryDto,
  AdminPaginationQueryDto,
  AdminPaginationDto,
  AdminService,
) {}
