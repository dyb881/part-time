import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountAdminService } from './admin.service';
import { AccountAdmin } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from './admin.dto';
import { IdsDto, CommonController } from '../../common';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController extends CommonController<
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminService
>(AccountAdmin, AccountAdminPaginationDto) {}
